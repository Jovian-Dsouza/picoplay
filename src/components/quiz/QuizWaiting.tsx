import React from "react";
import Image from "next/image";
import { TournamentSocketClock } from "@/src/components/clocks/TournamentSocketClock";

function QuizWaiting() {
  return (
    <div
      className={`w-full px-6 pt-6 pb-2 bg-[#F8FBFF] flex flex-col items-center justify-center`}
    >
      <div className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 text-center max-w-sm w-full space-y-2">
        <div className="relative">
          <div className="absolute top-[6.5rem] left-7 bg-[#0F0E0C] w-[75%] h-[15%] rounded-lg flex items-center justify-center">
            <TournamentSocketClock className="text-white font-bold text-xl" />
          </div>
          <Image
            src="/slot_machine.png"
            alt="Slot Machine"
            width={254.741}
            height={367}
          />
          <div className="absolute bottom-[1rem] left-4 w-[85%] h-[37%] rounded-lg flex flex-col pt-4 px-2 items-center space-y-2">
            <div className="text-black font-semibold font-dmsans">
              Theme of the quiz
            </div>
            <div className="text-black text-opacity-50 text-left font-dmsans">
              what is it about
            </div>
          </div>
        </div>
        <div className="text-black text-opacity-60 font-dmsans font-[500] text-xs text-center pt-4 px-2">
          Quiz will start as soon as the timer ends
        </div>
      </div>
    </div>
  );
}

export default QuizWaiting;
