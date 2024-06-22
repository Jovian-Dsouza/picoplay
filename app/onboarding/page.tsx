"use client";
import Image from "next/image";
import React, { ReactNode, useMemo, useState } from "react";

const TokenButton = ({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: ReactNode;
  onClick: any;
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-[7px] border py-2 text-center font-semibold border-gray-400 shadow-inner ${
        selected ? "bg-[#D3E1FF]" : "bg-[#EAEAEA]"
      } `}
      style={{
        boxShadow: "3px 2px 0px 0px rgba(0, 0, 0, 0.25) inset",
      }}
    >
      {children}
    </button>
  );
};

const OnboardingPage = () => {
  const tournamentTitle = "Tournament #1";
  const rewardToken = "BONK";
  const rewardAmount = "1 million";
  const joinMessage = "Join the reward pool, ace the quiz";
  const quizTheme = "Mathematics | Grade 10 level";
  const quizDetails = "50 questions | 20s to answer each";

  const tokenList = [
    { symbol: "BONK", img: "/tokens/bonk.jpeg" },
    { symbol: "USDC", img: "/tokens/usdc.jpeg" },
    { symbol: "SOL", img: "/tokens/sol.jpeg" },
  ];
  const [selectedToken, setSelectedToken] = useState(tokenList[0]);
  const amount = useMemo(() => {
    if (selectedToken.symbol === "BONK") {
      return "500,000";
    }
    return "500,000";
  }, [selectedToken]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F8FBFF]">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-dmsans font-semibold">
            {tournamentTitle}
          </div>
          <span className="text-sm bg-pink-200 text-pink-600 rounded-full px-2 py-1">
            {rewardAmount} {rewardToken}
          </span>
        </div>
        <p className="font-dmsans font-medium mb-6">{joinMessage}</p>
        <div className="space-y-2 mb-6">
          {tokenList.map((token, index) => (
            <TokenButton
              key={index}
              selected={token.symbol === selectedToken.symbol}
              onClick={() => {
                setSelectedToken(token);
              }}
            >
              <div className="flex flex-row items-center justify-center space-x-2">
                <Image
                  src={token.img}
                  height={17}
                  width={17}
                  alt="Token name"
                  className="rounded-full"
                />
                <div className="">{token.symbol}</div>
              </div>
            </TokenButton>
          ))}
        </div>
        <button className="w-full bg-[#4785FF] text-white rounded-full py-2 font-semibold">
          Pay {amount} {selectedToken.symbol}
        </button>
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-sm font-semibold mb-2">Theme of the quiz</h3>
          <ul className="text-sm text-gray-600 list-disc list-inside">
            <li>{quizTheme}</li>
            <li>{quizDetails}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
