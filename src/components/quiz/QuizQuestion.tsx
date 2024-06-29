import React, { useEffect, useState } from "react";
import { QuestionClock } from "@/src/components/clocks/QuestionClock";
import { LockButton } from "@/src/components/quiz/LockButton";
import { useRecoilValue } from "recoil";
import { questionAtom } from "@/src/store/atoms/quizAtoms";
import { SocketContextType, useSocket } from "@/src/providers/socket-provider";
import { SocketChannels } from "@/backend/src/constants";
import { ClientResponse } from "@/backend/src/Types";
import { QuizSelectBox } from "./QuizSelectBox";


function QuizQuestion() {
  const { socket } = useSocket() as SocketContextType;
  const question = useRecoilValue(questionAtom);
  const [selectedOption, setSetectedOption] = useState<string>("");

  useEffect(() => {
    if (question) {
      setSetectedOption("");
    }
  }, [question]);

  if (!question) {
    return null;
  }

  const handleSubmit = () => {
    if (socket && question && selectedOption !== "") {
      const clientResponse: ClientResponse = {
        question_id: question.question_id,
        user_option: selectedOption,
      };
      socket.emit(SocketChannels.SUBMIT_ANSWER, clientResponse);
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
          <QuizSelectBox
            key={index}
            answer={answer}
            index={index}
            question_id={question.question_id}
            selectedOption={selectedOption}
            setSelectedOption={setSetectedOption}
          />
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
