import { PrismaClient } from "@prisma/client";
import Coordinator from "./Coordinator";
import { QuestionWithAnswer, Tournament } from "./Types";
import { TIME_BETWEEN_QUESTION_ANSWER, TIME_FOR_ANSWER, TIME_FOR_QUESTION } from "./constants";

class TournamentManager {
  private prisma: PrismaClient;
  private coordinator: Coordinator;
  private currentQuestionIndex: number;
  private questions: QuestionWithAnswer[];
  public tournamentId: number | null = null;
  public timeForEachQuestion: number = TIME_FOR_QUESTION; //In seconds
  public timeForEachAnswer: number = TIME_FOR_ANSWER; //In seconds
  public timeDelayBetweenQuestionAnswer : number = TIME_BETWEEN_QUESTION_ANSWER; //In seconds

  constructor(
    prisma: PrismaClient,
    coordinator: Coordinator
  ) {
    this.prisma = prisma;
    this.coordinator = coordinator;
    this.currentQuestionIndex = 0;
    this.questions = [];
  }

  async startTournament(tournamentId: number) {
    try {
      this.tournamentId = tournamentId;
      this.currentQuestionIndex = 0; // Reset the question index

      // Fetch all questions for the tournament
      this.questions = await this.prisma.question.findMany({
        where: { tournaments: { some: { tournament_id: this.tournamentId } } },
      });

      if (!this.questions.length) {
        throw new Error("No questions found for this tournament");
      }

      this.coordinator.startTournament({ tournament_id: this.tournamentId });

      console.log(
        `Tournament ${this.tournamentId} started, num questions: ${this.questions.length}`
      );

      // Start sending questions
      this.sendNextQuestion();
    } catch (error) {
      console.error(`Error starting tournament ${this.tournamentId}:`, error);
    }
  }

  private async endTournament() {
    this.coordinator.endTournament();
    console.log(`Tournament ${this.tournamentId} ended`);
    // await this.prisma.$disconnect(); // Properly close Prisma client connection
  }

  private async sendNextQuestion() {
    if (this.currentQuestionIndex >= this.questions.length) {
      await this.endTournament();
      return;
    }
    const question = this.questions[this.currentQuestionIndex];
    this.coordinator.sendQuestion({
      question_id: this.currentQuestionIndex + 1,
      question_text: question.question_text,
      answer_1: question.answer_1,
      answer_2: question.answer_2,
      answer_3: question.answer_3,
      answer_4: question.answer_4,
      image_url: question.image_url,
      time: this.timeForEachQuestion,
    });

    setTimeout(() => this.sendAnswer(), (this.timeForEachQuestion + this.timeDelayBetweenQuestionAnswer) * 1000);
  }

  private calculateCorrectOption(question: QuestionWithAnswer): string {
  if (!question) {
    throw new Error("Question cannot be null or undefined");
  }
  switch (question.correct_answer) {
    case question.answer_1:
      return "A";
    case question.answer_2:
      return "B";
    case question.answer_3:
      return "C";
    case question.answer_4:
      return "D";
    default:
      throw new Error("Invalid correct answer index");
  }
}

  private async sendAnswer() {
    const question = this.questions[this.currentQuestionIndex];

    this.coordinator.sendAnswer({
      question_id: question.question_id,
      question_text: question.question_text,
      correct_answer: question.correct_answer,
      correct_option: this.calculateCorrectOption(question),
      time: this.timeForEachAnswer,
    });

    this.currentQuestionIndex++;
    setTimeout(() => this.sendNextQuestion(), (this.timeForEachAnswer + this.timeDelayBetweenQuestionAnswer) * 1000);
  }
}

export default TournamentManager;
