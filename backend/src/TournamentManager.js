const dayjs = require("dayjs");
const { PrismaClient } = require("@prisma/client");

class TournamentManager {
  constructor(io) {
    this.io = io;
    this.prisma = new PrismaClient();
    this.currentQuestionIndex = 0;
    this.questions = [];
    this.tournamentId = null;
    this.timeForEachQuestion = 20
  }

  async startTournament(tournamentId) {
    try {
      this.tournamentId = tournamentId;
      this.currentQuestionIndex = 0; // Reset the question index

      // Fetch all questions for the tournament
      this.questions = await this.prisma.question.findMany({
        where: { tournaments: { some: { tournament_id: tournamentId } } },
      });

      if (!this.questions.length) {
        throw new Error("No questions found for this tournament");
      }

      // Notify all connected clients that the tournament has started
      this.io.emit("tournamentStarted", { tournamentId });

      console.log(`Tournament ${tournamentId} started, num questoins: ${this.questions.length}`);

      // Start sending questions
      this.sendNextQuestion();
    } catch (error) {
      console.error(`Error starting tournament ${tournamentId}:`, error);
    }
  }

  async sendNextQuestion() {
    if (this.currentQuestionIndex < this.questions.length) {
      const question = this.questions[this.currentQuestionIndex];
      const end_timestamp = dayjs()
        .add(this.timeForEachQuestion, "second")
        .valueOf();

      this.io.emit("question", {
        question_id: question.question_id,
        question_text: question.question_text,
        answer_1: question.answer_1,
        answer_2: question.answer_2,
        answer_3: question.answer_3,
        answer_4: question.answer_4,
        image_url: question.image_url,
        end_timestamp: end_timestamp,
      });

      this.currentQuestionIndex++;
      setTimeout(() => this.sendNextQuestion(), this.timeForEachQuestion); // Wait for 5 seconds before sending the next question
    } else {
      this.io.emit("tournamentEnded", { tournamentId: this.tournamentId });
      console.log(`Tournament ${this.tournamentId} ended`);
      this.prisma.$disconnect(); // Properly close Prisma client connection
    }
  }
}

module.exports = TournamentManager;
