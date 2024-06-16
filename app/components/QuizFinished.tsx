import React from "react";
import Image from "next/image";

const TrophyIcon = () => (
  <Image src="/trophy-icon.png" alt="Trophy Icon" width={130} height={130} />
);

const BonkIcon = () => (
  <Image
    src="/bonk-token-frame.png"
    alt="Trophy Icon"
    width={130}
    height={130}
  />
);

const RankAndScore = () => (
  <div className="flex items-center justify-center space-x-6">
    <Rank />
    <Score />
  </div>
);

const Rank = () => (
  <div className="flex flex-row space-x-2 items-center justify-center">
    <RankIcon />
    <div className="flex flex-col">
      <div className="text-xs font-medium text-[#363636] text-opacity-50 font-dmsans">
        Rank
      </div>
      <div className="text-sm font-medium text-[#363636] font-dmsans">028</div>
    </div>
  </div>
);

const RankIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
  >
    <rect width="24" height="24" rx="4" fill="#EAF2FE" />
    <path
      d="M2 19.99L9.5 12.48L13.5 16.48L20.59 8.51001L22 9.92001L13.5 19.48L9.5 15.48L3.5 21.49L2 19.99ZM3.5 15.49L9.5 9.48001L13.5 13.48L22 3.92001L20.59 2.51001L13.5 10.48L9.5 6.48001L2 13.99L3.5 15.49Z"
      fill="#4785FF"
    />
  </svg>
);

const Score = () => (
  <div className="flex flex-row space-x-2 items-center justify-center">
    <ScoreIcon />
    <div className="flex flex-col">
      <div className="text-xs font-medium text-[#363636] text-opacity-50 font-dmsans">
        Score
      </div>
      <div className="text-md font-medium text-[#C2580B] font-dmsans">
        42<span className="text-xs">/50</span>
      </div>
    </div>
  </div>
);

const ScoreIcon = () => (
  <div className="bg-[#FFE9D4] rounded-md">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M22 9.74L14.81 9.12L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77L18.18 21.5L16.55 14.47L22 9.74ZM12 15.9L8.24 18.17L9.24 13.89L5.92 11.01L10.3 10.63L12 6.6L13.71 10.64L18.09 11.02L14.77 13.9L15.77 18.18L12 15.9Z"
        fill="#C2790B"
      />
    </svg>
  </div>
);

const RewardBox = () => (
  <div className="absolute -bottom-24 reward-box flex flex-col space-y-2 items-center justify-start text-center px-4 pt-3">
    <div className="text-sm font-medium text-[#D58000] text-opacity-70 font-dmsans">
      Your Reward
    </div>
    <div className="flex flex-row items-center space-x-2">
      <Image src="/bonk-token.png" alt="Bonk Token" width={24} height={24} />
      <div className="text-lg font-medium text-[#8D5610] font-dmsans">
        500k BONK
      </div>
    </div>
    <div className="text-sm font-medium text-[#5C3504] font-dmsans">
      Tokens will be sent to your wallet, with your contribution amount!
    </div>
  </div>
);

function QuizFinished() {
  const isWinner = false; //TODO calculate result from server data
  return (
    <div className="w-full px-6 pt-10 bg-[#F8FBFF] text-center">
      <div className="relative flex flex-col items-center justify-center">
        <div className="bg-gradient-to-t from-black to-[#F8FBFF] rounded-xl shadow-xl max-w-sm w-full">
          <div className="bg-white flex flex-col items-center justify-center p-8 pt-10 pb-20 space-y-5 zigzag-top rounded-xl">
            {isWinner ? <TrophyIcon /> : <BonkIcon />}
            <p className="text-lg text-[#2D81F7] font-medium font-dmsans">
              {isWinner
                ? "You are among the top 5% among the leaderboard."
                : "Great effort on this one, all the best for the next time!"}
            </p>
            <RankAndScore />
          </div>
        </div>
        <RewardBox />
      </div>
    </div>
  );
}

export default QuizFinished;
