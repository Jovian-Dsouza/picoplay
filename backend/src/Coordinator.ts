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
        this.handleClientResponse(data);
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
      socket.emit(SocketChannels.ANSWER, this.answer);
    }
  }

  private async handleClientResponse(response: ClientResponse) {
    try {
      const timestamp = dayjs().valueOf();
      if (
        this.questionEndTimestamp && timestamp <= this.questionEndTimestamp
      ) {
        const timetaken = timestamp - this.questionStartTimestamp!;
        console.log(
          `Received answer: ${response.answer} for question ID: ${response.question_id}, time: ${timetaken}`
        );
        // Push the user responses to Redis queue
        // await this.redisClient!.rPush(
        //   REDIS_RESPONSES_QUEUE,
        //   JSON.stringify(responseWithTimestamp)
        // );
      } else {
        console.log("Client response is invalid: Time limit over");
      }
    } catch (error) {
      console.error("Error pushing response to Redis queue:", error);
    }
  }

  startTournament(tournament: Tournament) {
    this.tournament = tournament;
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
    this.questionEndTimestamp = timestamp.add(question.time, "second").valueOf();
    this.question = question;
    this.answer = null;
    this.io.emit(SocketChannels.QUESTION, this.question);
    this.startCountDown(question.time);
  }

  sendAnswer(answer: Answer) {
    this.question = null;
    this.answer = answer;
    this.io.emit(SocketChannels.ANSWER, answer);
    this.startCountDown(answer.time);
  }
}

export default Coordinator;
