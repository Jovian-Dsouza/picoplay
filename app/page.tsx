"use client";
import Head from "next/head";
import QuizQuestion from "./components/QuizQuestion";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface Question {
  question_id: number;
  question_text: string;
  answer_1: string;
  answer_2: string;
  answer_3: string;
  answer_4: string;
  image_url?: string;
  end_timestamp: number;
}


export default function Home() {
  const [question, setQuestion] = useState<Question | null>();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    // Connect to the WebSocket server
    const socketInstance: Socket = io(
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000"
    );
    setSocket(socketInstance);

    // Listen for the 'firstQuestion' event
    socketInstance.on("question", (data: Question) => {
      console.log(data);
      setQuestion(data);
      setSelectedAnswer(null);
    });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  useEffect(() => {
    if (question) {
      const interval = setInterval(() => {
        const now = dayjs();
        const end = dayjs(question.end_timestamp);
        const diff = end.diff(now);

        if (diff <= 0) {
          clearInterval(interval);
          setTimeLeft("Time's up!");
          // Optionally, you can handle the timeout scenario here
        } else {
          const duration = dayjs.duration(diff);
          setTimeLeft(
            `${duration.minutes()}:${duration
              .seconds()
              .toString()
              .padStart(2, "0")}`
          );
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [question]);

  const handleSubmit = () => {
    if (socket && question && selectedAnswer) {
      socket.emit("submitAnswer", {
        question_id: question.question_id,
        answer: selectedAnswer,
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Quiz App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="text-4xl font-bold mb-12">Pico Play</div>

        {question && (
          <>
            <div className="text-2xl font-bold mb-4 text-red-300">{timeLeft}</div>
            <QuizQuestion
              question_id={question.question_id}
              question_text={question.question_text}
              answer_1={question.answer_1}
              answer_2={question.answer_2}
              answer_3={question.answer_3}
              answer_4={question.answer_4}
              image_url={question.image_url}
              selectedAnswer={selectedAnswer}
              onSelectAnswer={(ans: string) => setSelectedAnswer(ans)}
            />
            <button
              onClick={handleSubmit}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Submit Answer
            </button>
          </>
        )}
      </main>
    </div>
  );
}
