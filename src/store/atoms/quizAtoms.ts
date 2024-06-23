import { atom } from "recoil";
import {
  AnswerWithResponse,
  QuestionWithTime as Question,
} from "../../../backend/src/Types";

export const questionAtom = atom<Question | null>({
  key: "questionAtom",
  default: null,
});

export const answerAtom = atom<AnswerWithResponse | null>({
  key: "answerAtom",
  default: null,
});

export const finishedAtom = atom({
  key: "finishedAtom",
  default: false,
});
