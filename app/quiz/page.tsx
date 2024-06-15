"use client";
import QuizQuestion from "../components/QuizQuestion";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { QuestionWithTime as Question } from "@/backend/src/Types";

dayjs.extend(duration);


export default function Quiz() {
  const [question, setQuestion] = useState<Question | null>(null);
  
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const socketInstance: Socket = io(
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
    );
    setSocket(socketInstance);

    socketInstance.on("question", (data: Question) => {
      setQuestion(data);
    });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className="flex  flex-col items-center">
      {/* Quiz progress bar*/}
      <QuizQuestion question={question} socket={socket}/>
    </div>
  );
}
