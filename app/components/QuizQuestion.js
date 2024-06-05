import React from "react";

const QuizQuestion = ({
  question_id,
  question_text,
  answer_1,
  answer_2,
  answer_3,
  answer_4,
  image_url,
  selectedAnswer,
  onSelectAnswer,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="px-24 py-16">
        {image_url && (
          <img
            src={image_url}
            alt={`Question ${question_id}`}
            className="w-full mb-4"
          />
        )}
        <div className="font-bold text-xl mb-2 text-black">
          Q. {question_id}
        </div>
        <p className="text-gray-700 text-base">{question_text}</p>
        <ul className="mt-4">
          {[answer_1, answer_2, answer_3, answer_4].map((answer, index) => (
            <li key={index} className="flex items-center my-2">
              <input
                type="radio"
                id={`option${index}-${question_id}`}
                name={`question${question_id}`}
                className="mr-2"
                checked={selectedAnswer === answer}
                onChange={() => onSelectAnswer(answer)}
              />
              <label
                htmlFor={`option${index}-${question_id}`}
                className="text-gray-700"
              >
                {String.fromCharCode(65 + index)}. {answer}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizQuestion;
