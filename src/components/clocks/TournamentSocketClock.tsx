import { SocketChannels } from "@/backend/src/constants";
import { SocketContextType, useSocket } from "@/src/providers/socket-provider";
import React, { useState, useEffect, useMemo } from "react";

export function TournamentSocketClock({ className }: { className: string }) {
  const { socket } = useSocket() as SocketContextType;
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (socket) {
      socket.on(SocketChannels.QUIZ_COUNT_DOWN, (data: number) => {
        setTimeLeft(data);
      });
    }
  }, [socket]);

  const formattedTime = useMemo(() => {
    const days = Math.floor(timeLeft / (24 * 60 * 60));
    const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
    const seconds = timeLeft % 60;

    //24 hours or more, it shows days:hours:minutes format
    //less than 24 hours, it shows hours:minutes:seconds format
    if (timeLeft >= 24 * 60 * 60) {
      return `${days}d : ${String(hours).padStart(2, "0")}h : ${String(
        minutes
      ).padStart(2, "0")}m`;
    } else {
      return `${String(hours).padStart(2, "0")}h : ${String(minutes).padStart(
        2,
        "0"
      )}m : ${String(seconds).padStart(2, "0")}s`;
    }
  }, [timeLeft]);

  return <div className={className}>{formattedTime}</div>;
}
