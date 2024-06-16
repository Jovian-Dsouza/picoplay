"use client";
import QuizQuestion from "../components/QuizQuestion";
import QuizAnswer from "../components/QuizAnswer";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {
  AnswerWithResponse,
  QuestionWithTime as Question,
} from "@/backend/src/Types";
import QuizWaiting from "../components/QuizWaiting";
import QuizFinished from "../components/QuizFinished";

dayjs.extend(duration);

const testQuestion = {
  question_id: 1,
  question_text: "What is 7 + 7 ÷ 7 + 7 x 7 – 7?",
  answer_1: "48",
  answer_2: "23",
  answer_3: "24",
  answer_4: "54",
  image_url: null,
  time: 20,
};

const testAnswer = {
  question_id: 1,
  correct_option: "A",
  correct_answer: "48",
  user_option: "B",
  time: 20,
  total_correct: 1,
  total_incorrect: 0,
};

export default function Quiz() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<AnswerWithResponse | null>(null);

  const [socket, setSocket] = useState<Socket | null>(null);
  const [finished, setFinished] = useState(false);

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

  if (finished) {
    return <QuizFinished />;
  }

  if (!question && !answer) {
    return <QuizWaiting socket={socket} />;
  }

  return (
    <div className="flex  flex-col items-center">
      {/* TODO: Quiz progress bar*/}
      <QuizQuestion question={question} socket={socket} />
      <QuizAnswer answer={answer} socket={socket} />
      {/* TODO: Quiz time left */}
    </div>
  );
}
