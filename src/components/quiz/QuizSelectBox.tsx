function getOptionFromIndex(index: number): string {
  return String.fromCharCode(65 + index);
}

export function QuizSelectBox({
  index,
  answer,
  question_id,
  selectedOption,
  setSelectedOption,
}: {
  index: number;
  answer: string;
  question_id: number;
  selectedOption: string;
  setSelectedOption: any;
}) {
  const currentOption = getOptionFromIndex(index);
  return (
    <li
      key={index}
      className={`flex items-center border rounded-md p-2 ${
        currentOption === selectedOption
          ? "bg-[#EDF3FD] border-[#4785FF]"
          : "bg-white border-black border-opacity-10"
      }`}
    >
      <input
        type="radio"
        id={`option${index}-${question_id}`}
        name={`question${question_id}`}
        className="mr-2 hidden"
        checked={currentOption === selectedOption}
        onChange={() => setSelectedOption(currentOption)}
      />
      <label
        htmlFor={`option${index}-${question_id}`}
        className="flex items-center cursor-pointer w-full"
      >
        <span
          className={`w-6 h-6 flex items-center justify-center border rounded-md mr-4 font-[500] font-dmsans text-lg`}
        >
          {currentOption}
        </span>
        <span className="text-black text-lg font-dmsans font-[500]">
          {answer}
        </span>
      </label>
    </li>
  );
}
