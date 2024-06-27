export enum SocketChannels {
  TOURNAMENT_STARTED = "tournamentStarted",
  TOURNAMENT_COMPLETED = "tournamentCompleted",
  QUESTION = "question",
  ANSWER = "answer",
  SUBMIT_ANSWER = "submitAnswer",
  COUNT_DOWN = "countDown",
  QUIZ_COUNT_DOWN = "quizCountDown",
}

export const REDIS_RESPONSES_QUEUE = "responses";
export const TIME_FOR_QUESTION = 20;
export const TIME_FOR_ANSWER = 10;
export const TIME_BETWEEN_QUESTION_ANSWER = 1.5;