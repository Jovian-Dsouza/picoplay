import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

export function QuestionClock({
  socket,
  startTime,
}: {
  socket: Socket | null;
  startTime: number | null;
}) {
  const [timeLeft, setTimeLeft] = useState<number | null>(startTime);

  useEffect(() => {
    if (socket) {
      socket.on("countDown", (data: number) => {
        setTimeLeft(data);
      });
    }
  }, [socket]);

  if (!timeLeft) {
    return null;
  }

  return (
    <div className="font-[500] text-[#03379F] flex items-center bg-[#DAE6FF] px-2 py-1 rounded-lg space-x-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="17"
        viewBox="0 0 17 17"
        fill="none"
      >
        <path
          d="M10.625 1.0625H6.375V2.47917H10.625V1.0625ZM7.79167 10.2708H9.20833V6.02083H7.79167V10.2708ZM13.4796 5.58875L14.4854 4.58292C14.1808 4.22167 13.8479 3.88167 13.4867 3.58417L12.4808 4.59C11.3829 3.71167 10.0017 3.1875 8.5 3.1875C4.97958 3.1875 2.125 6.04208 2.125 9.5625C2.125 13.0829 4.9725 15.9375 8.5 15.9375C12.0275 15.9375 14.875 13.0829 14.875 9.5625C14.875 8.06083 14.3508 6.67958 13.4796 5.58875ZM8.5 14.5208C5.75875 14.5208 3.54167 12.3038 3.54167 9.5625C3.54167 6.82125 5.75875 4.60417 8.5 4.60417C11.2413 4.60417 13.4583 6.82125 13.4583 9.5625C13.4583 12.3038 11.2413 14.5208 8.5 14.5208Z"
          fill="#03379F"
        />
      </svg>
      <div className="w-5">{String(timeLeft).padStart(2, "0")}</div>
    </div>
  );
}
