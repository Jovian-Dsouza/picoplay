import {
  QuestionWithTime,
  ClientResponse,
  Tournament,
  Answer,
  ClientResponseWithTimestamp,
} from "./Types";
import { Server, Socket } from "socket.io";
import dayjs, { Dayjs } from "dayjs";
import { REDIS_RESPONSES_QUEUE, SocketChannels } from "./constants";

class Coordinator {
  private io: Server;
  private redisClient: any = null;
  private tournament: Tournament | null = null;
  private question: QuestionWithTime | null = null;
  private questionStartTimestamp: number | null = null;
  private questionEndTimestamp: number | null = null;
  private answer: Answer | null = null;

  constructor(io: Server, redisClient: any) {
    this.io = io;
    this.redisClient = redisClient;

    this.io.on("connection", async (socket) => {
      this.handleNewClient(socket);

      socket.on(SocketChannels.SUBMIT_ANSWER, (data) => {
        this.handleClientResponse(socket, data);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  private handleNewClient(socket: Socket) {
    console.log("New client connected");
    if (this.tournament) {
      socket.emit(SocketChannels.TOURNAMENT_STARTED, this.tournament);
    }
    if (this.question) {
      socket.emit(SocketChannels.QUESTION, this.question);
    }
    if (this.answer) {
      //TODO
      socket.emit(SocketChannels.ANSWER, this.answer);
    }
  }

  private async handleClientResponse(socket: Socket, response: ClientResponse) {
    try {
      const timestamp = dayjs().valueOf();
      const walletAddress = (socket.request as any).user.walletAddress;
      if (this.questionEndTimestamp && timestamp <= this.questionEndTimestamp) {
        const timetaken = timestamp - this.questionStartTimestamp!;
        console.log(
          `Received answer from client ${walletAddress}: ${response.user_option} for question ID: ${response.question_id}, time: ${timetaken}`
        );
        const clientResponse = {
          selected_option: response.user_option,
          timetaken: timetaken,
        };
        // 1. Store client answer in redis cache to be used in send answer to check if the answer is correct or not
        await this.redisClient.hSet(
          `responses:${this.tournament?.tournament_id}:${response.question_id}`,
          walletAddress,
          JSON.stringify(clientResponse)
        );

        // 2. Push the Client responses to Redis queue
        // await this.redisClient!.rPush(
        //   REDIS_RESPONSES_QUEUE,
        //   JSON.stringify(clientResponse)
        // );
      } else {
        console.log(
          `Client response from ${walletAddress} is invalid: Time limit over`
        );
      }
    } catch (error) {
      console.error("Error pushing response to Redis queue:", error);
    }
  }

  private async clearRedisCache() {
    // Clear responses for the current tournament from Redis
    // await this.redisClient.del(`responses:${this.tournament?.tournament_id}`);
    // await this.redisClient.del(`scores:${this.tournament?.tournament_id}`);
    await this.redisClient.flushDb();
    console.log(
      `Cleared Redis cache for tournament ${this.tournament?.tournament_id}`
    );
  }

  startTournament(tournament: Tournament) {
    this.tournament = tournament;
    this.clearRedisCache();
    this.io.emit(SocketChannels.TOURNAMENT_STARTED, tournament);
  }

  endTournament() {
    this.io.emit(SocketChannels.TOURNAMENT_COMPLETED, this.tournament);
    this.tournament = null;
    this.answer = null;
    this.question = null;
  }

  startCountDown(roundTime: number) {
    let count = roundTime + 1;
    const roundCountDown = setInterval(() => {
      count--;
      this.io.emit(SocketChannels.COUNT_DOWN, count);
      if (count === 0) {
        clearInterval(roundCountDown);
      }
    }, 1000);
  }

  sendQuestion(question: QuestionWithTime) {
    const timestamp = dayjs();
    this.questionStartTimestamp = timestamp.valueOf();
    this.questionEndTimestamp = timestamp
      .add(question.time, "second")
      .valueOf();
    this.question = question;
    this.answer = null;
    this.io.emit(SocketChannels.QUESTION, this.question);
    this.startCountDown(question.time);
  }

  async sendAnswer(answer: Answer) {
    this.question = null;
    this.answer = answer;

    // For each connected client, check the user response from Redis and check if the answer is correct or wrong
    const clientSockets = await this.io.fetchSockets();
    const multi = this.redisClient.multi();

    const walletAddresses = clientSockets.map(
      (socket) => ((socket as any).request as any).user.walletAddress
    );

    const scoreValues = await this.redisClient.hmGet(
      `scores:${this.tournament?.tournament_id}`,
      ...walletAddresses
    );

    const responseValues = await this.redisClient.hmGet(
      `responses:${this.tournament?.tournament_id}:${answer.question_id}`,
      ...walletAddresses
    );

    clientSockets.forEach((socket, index) => {
      const walletAddress = walletAddresses[index];
      const responseJson = responseValues[index];
      const scoreJson = scoreValues[index];

      const { total_correct, total_incorrect } = this.calculateScores(
        answer.question_id,
        responseJson,
        scoreJson,
        answer.correct_option
      );

      socket.emit(SocketChannels.ANSWER, {
        question_id: answer.question_id,
        correct_option: answer.correct_option,
        user_option: responseJson
          ? JSON.parse(responseJson).selected_option
          : "",
        time: answer.time,
        total_correct: total_correct,
        total_incorrect: total_incorrect,
      });

      multi.hSet(
        `scores:${this.tournament?.tournament_id}`,
        walletAddress,
        JSON.stringify({ total_correct, total_incorrect })
      );
    });

    multi.exec((err: any, replies: any) => {
      if (err) {
        console.error("Error executing Redis transaction:", err);
      } else {
        console.log("Redis transaction executed successfully");
      }
    });
    this.startCountDown(answer.time);
  }

  private calculateScores(
    questionId: number,
    responseJson: string,
    scoreJson: string,
    correctOption: string
  ) {
    let total_correct = 0;
    let total_incorrect = 0;

    if (scoreJson) {
      const scores = JSON.parse(scoreJson);
      total_correct = scores.total_correct;
      total_incorrect = scores.total_incorrect;
    }

    const total_skip = questionId - total_correct - total_incorrect - 1;
    total_incorrect += total_skip;

    if (responseJson) {
      const clientResponse = JSON.parse(responseJson);

      if (clientResponse.selected_option === correctOption) {
        total_correct += 1;
      } else {
        total_incorrect += 1;
      }
    } else {
      total_incorrect += 1;
    }

    return { total_correct, total_incorrect };
  }
}

export default Coordinator;
