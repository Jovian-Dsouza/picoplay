"use client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import QuizQuestion from "@/src/components/quiz/QuizQuestion";
import QuizAnswer from "@/src/components/quiz/QuizAnswer";
import QuizWaiting from "@/src/components/quiz/QuizWaiting";
import QuizFinished from "@/src/components/quiz/QuizFinished";
import { useRecoilValue } from "recoil";
import { questionAtom, answerAtom, finishedAtom } from "@/src/store/atoms/quizAtoms"

dayjs.extend(duration);

export default function Quiz() {
  const question = useRecoilValue(questionAtom);
  const answer = useRecoilValue(answerAtom);
  const finished = useRecoilValue(finishedAtom);

  if (finished) {
    return <QuizFinished />;
  }

  if (!question && !answer) {
    return <QuizWaiting />;
  }

  return (
    <div className="flex  flex-col items-center">
      {/* TODO: Quiz progress bar*/}
      
      <QuizQuestion />
      <QuizAnswer />
      {/* TODO: Quiz time left */}
    </div>
  );
}
