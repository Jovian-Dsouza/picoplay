import { SocketChannels } from "@/backend/src/constants";
import { SocketContextType, useSocket } from "@/src/providers/socket-provider";
import { useState, useEffect, useMemo } from "react";

export function AnswerClock({
  startTime,
}: {
  startTime: number;
}) {
  const { socket } = useSocket() as SocketContextType;
  const [timeLeft, setTimeLeft] = useState<number>(startTime);
  const progress = useMemo(() => {
    const totalBars = 4;
    const barIndex = Math.floor(
      (totalBars * (startTime - timeLeft)) / startTime
    );
    const newProgress = Array(totalBars)
      .fill(0)
      .map((_, index) => (index <= barIndex ? 1 : 0));
    return newProgress;
  }, [timeLeft, startTime]);

  useEffect(() => {
    if (socket) {
      socket.on(SocketChannels.COUNT_DOWN, (data: number) => {
        setTimeLeft(data);
      });
    }
  }, [socket]);

  return (
    <div>
      <p className="text-black opacity-50 pt-6 text-sm font-dmsans">
        Next Question In{" "}
        <span className="font-semibold">{timeLeft} Seconds</span>
      </p>
      <div className="flex justify-center items-center mt-6 space-x-2">
        {progress.map((isActive, index) => (
          <div
            key={index}
            className={`w-8 h-2 rounded-full transition-transform duration-500 bg-[#D9D9D9] `}
          >
            <div
              className={`w-8 h-2 rounded-full transition-transform duration-500 ${
                isActive ? "bg-[#46596F] scale-x-100" : "bg-[#D9D9D9] scale-x-0"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
