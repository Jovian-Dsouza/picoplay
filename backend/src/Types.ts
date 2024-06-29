export interface Question {
  question_id: number;
  question_text: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  image_url: string | null;
}

export interface QuestionWithAnswer extends Question {
  correct_answer: string;
}

export interface QuestionWithTime extends Question {
  time: number;
}

export interface Answer {
  question_id: number;
  question_text: string;
  correct_answer: string;
  correct_option: string;
  time: number;
}

export interface AnswerWithResponse {
  question_id: number;
  correct_option: string;
  user_option: string;
  time: number;
  total_correct: number;
  total_incorrect: number;
}

export interface ClientResponse {
  user_option: string;
  question_id: number;
}

export interface ClientResponseWithTimestamp extends ClientResponse {
  timestamp: number;
}

export interface Tournament {
    tournament_id: number,
}