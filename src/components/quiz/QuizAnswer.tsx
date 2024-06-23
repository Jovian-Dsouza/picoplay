import React, { useMemo } from "react";
import { AnswerClock } from "@/src/components/clocks/AnswerClock";
import { CheckCircleIcon } from "@/src/components/icons/CheckCircleIcon";
import { XCircleIcon } from "@/src/components/icons/XCircleIcon";
import { useRecoilValue } from "recoil";
import { answerAtom } from "@/src/store/atoms/quizAtoms";

function QuizAnswer() {
  const answer = useRecoilValue(answerAtom);
  const isCorrect = useMemo(() => {
    if (answer) {
      return answer.correct_option === answer.user_option;
    }
    return false;
  }, [answer]);

  if (!answer) {
    return null;
  }

  return (
    <div
      className={`flex flex-col items-center justify-center w-full px-8 pt-16 bg-gradient-to-b to-[#F8FBFF] ${
        isCorrect ? "from-green-100" : "from-red-100"
      }`}
    >
      <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 text-center max-w-sm w-full space-y-2">
        <div className="text-lg font-semibold font-dmsans text-gray-800 mt-4">
          {isCorrect ? "That was correct!" : "Uh oh! that was incorrect!"}
        </div>
        {!isCorrect && (
          <p className="text-black text-opacity-50 text-sm font-dmsans">
            The correct answer was{" "}
            <span className="font-semibold">{answer.correct_option}.</span>
          </p>
        )}
        <div className="py-2" />
        {isCorrect ? <CheckCircleIcon /> : <XCircleIcon />}

        <AnswerClock startTime={answer.time} />
      </div>

      <div className="flex justify-center items-center w-full max-w-sm mt-10 px-8 text-sm font-dmsans space-x-8">
        <div className="text-green-500 ">
          Correct{" "}
          <span className="font-semibold">
            {String(answer.total_correct).padStart(2, "0")}
          </span>
        </div>
        <div className="text-red-500">
          Incorrect{" "}
          <span className="font-semibold">
            {String(answer.total_incorrect).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default QuizAnswer;
