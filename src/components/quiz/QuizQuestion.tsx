import React, { useState } from "react";
import { QuestionClock } from "@/src/components/clocks/QuestionClock";
import { LockButton } from "@/src/components/quiz/LockButton";
import { useRecoilValue } from "recoil";
import { questionAtom } from "@/src/store/atoms/quizAtoms";
import { SocketContextType, useSocket } from "@/src/providers/socket-provider";

function QuizQuestion() {
  const { socket } = useSocket() as SocketContextType;
  const question = useRecoilValue(questionAtom);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (!question) {
    return null;
  }
  const handleSubmit = () => {
    if (socket && question && selectedAnswer) {
      socket.emit("submitAnswer", {
        question_id: question.question_id,
        answer: selectedAnswer,
      });
    }
  };

  return (
    <div className="w-full px-8 mt-6 bg-[#F8FBFF]">
      {/* {question.image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={question.image_url}
          alt={`Question ${question.question_id}`}
          className="w-full mb-4"
        />
      )} */}
      <div className="flex flex-row items-center justify-between">
        <div className="font-bold text-xl font-dmsans text-black">
          Q. {String(question.question_id).padStart(2, "0")}
        </div>
        <QuestionClock startTime={question.time} />
      </div>

      <p className="mt-5 text-black text-lg font-semibold font-dmsans">
        {question.question_text}
      </p>
      <ul className="space-y-2 mt-5">
        {[
          question.answer_1,
          question.answer_2,
          question.answer_3,
          question.answer_4,
        ].map((answer, index) => (
          <li
            key={index}
            className={`flex items-center border rounded-md p-2 ${
              selectedAnswer === answer
                ? "bg-[#EDF3FD] border-[#4785FF]"
                : "bg-white border-black border-opacity-10"
            }`}
          >
            <input
              type="radio"
              id={`option${index}-${question.question_id}`}
              name={`question${question.question_id}`}
              className="mr-2 hidden"
              checked={selectedAnswer === answer}
              onChange={() => setSelectedAnswer(answer)}
            />
            <label
              htmlFor={`option${index}-${question.question_id}`}
              className="flex items-center cursor-pointer w-full"
            >
              <span
                className={`w-6 h-6 flex items-center justify-center border rounded-md mr-4 font-[500] font-dmsans text-lg`}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="text-black text-lg font-dmsans font-[500]">
                {answer}
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className="flex flex-row mt-8 items-center justify-between">
        <div className="text-xs font-dmsans font-[500] text-black text-opacity-40 tracking-tighter">
          Lock your answer before the timer ends
        </div>
        <LockButton id={question.question_id} onClick={handleSubmit} />
      </div>
    </div>
  );
}

export default QuizQuestion;
