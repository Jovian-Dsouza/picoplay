"use client";
import Image from "next/image";
import React, { ReactNode, useMemo, useState } from "react";
import { CheckCircleIcon } from "@/src/components/icons/CheckCircleIcon";
import Link from "next/link";
import { TwitterIcon } from "@/src/components/icons/TwitterIcon";
import { ArrowUpward } from "@/src/components/icons/ArrowUpward";

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

function PaymentComplete() {
  const userName = "Aryan";
  const nextTournamentDate = "1st July, 13:00 UTC";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-between py-16 bg-[#F8FBFF]">
      <div className="bg-white shadow-lg rounded-lg px-6 py-10 max-w-xs text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <CheckCircleIcon width="24" height="24" />
          <span className="text-xl font-medium text-black font-dmsans">
            You are all set, {userName}!
          </span>
        </div>

        <div className="font-dmsans text-black text-sm opacity-50 mb-8">
          The next tournament is on {nextTournamentDate}
        </div>
        <Image
          src="/bonk-mascot.png"
          alt="Tournament Mascot"
          width={100}
          height={100}
          className="mx-auto"
        />
        <button
          className="flex flex-row items-center justify-center w-full bg-[#4785FF] text-white text-sm font-dmsans font-medium rounded-[64px] py-2 mb-6 border border-black border-opacity-10 shadow-inner"
          style={{ boxShadow: "3px 4px 0px 0px rgba(0, 0, 0, 0.25)" }}
        >
          Share on{" "}
          <span className="px-1">
            <TwitterIcon />
          </span>
          for more goodwill{" "}
          <span className="px-1">
            <ArrowUpward />
          </span>
        </button>
        <div className="text-sm text-black text-opacity-50">
          Earn a percentage of rewards when your referred user wins!
        </div>
      </div>

      <div className="flex flex-col items-center text-center justify-center max-w-[16rem] mt-16 space-y-3">
        <div className="text-sm text-black font-dmsans">
          follow{" "}
          <span className="underline">
            <Link href="https://x.com/picoplayfun">@picoplayfun</Link>
          </span>{" "}
          for more updates
        </div>
        <div className="text-xs text-black text-opacity-50 font-dmsans">
          revisit this site on the match day and connect your wallet to continue
          playing
        </div>
      </div>
    </div>
  );
}

function PaymentSelect() {
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
}

const OnboardingPage = () => {
  const paymentComplete = false;

  if (paymentComplete) {
    return <PaymentComplete />;
  }

  return <PaymentSelect />;
};

export default OnboardingPage;
