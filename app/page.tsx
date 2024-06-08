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
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-col w-full flex-1  text-center">
        <section className="flex flex-col items-center justify-center text-center px-4 py-14 mb-4 bg-bonk-banner bg-bottom">
          <div className="text-2xl font-bold">Who’s The Genius</div>
          <p className="text-[#404040] font-semibold mt-4 max-w-xs md:max-w-md">
            Play weekly quizzes, compete for a growing prize pool, and earn
            rewards.
          </p>

          <button className="bg-white border-b-[6px] border-r-[6px] border-[#3C5381] shadow-lg text-black text-xl font-bold rounded-full px-8 py-4 mt-10 w-full md:max-w-md">
            Register Now
          </button>
        </section>

        <section className="text-center mb-6 space-y-2">
          <p className="text-sm">Next Tournament Starts in</p>
          <p className="text-2xl font-bold">22d : 17h : 10m</p>
        </section>

        <div className="space-y-2 px-4">
          <div className="homepage-box-blue homepage-box">
            <span>50 Questions</span>
          </div>
          <div className="homepage-box-yellow homepage-box">
            <span>100M Bonk Price Pool</span>
          </div>
          <div className="homepage-box-green homepage-box">
            <span>1200+ Participants</span>
          </div>
        </div>


        <section className="my-6 px-4 text-left">
          <h3 className="text-lg font-bold mb-2">FAQ</h3>
          <div className="space-y-2">
            <details className="faq-box">
              <summary className="cursor-pointer">
                What’s the scope of the questions?
              </summary>
              <p className="mt-2">
                The questions cover a wide range of topics.
              </p>
            </details>
            <details className="faq-box">
              <summary className="cursor-pointer">
                Do I need to deposit tokens before playing?
              </summary>
              <p className="mt-2">Yes, a deposit is required to participate.</p>
            </details>
            <details className="faq-box">
              <summary className="cursor-pointer">
                How long does the quiz last?
              </summary>
              <p className="mt-2">The quiz typically lasts for 30 minutes.</p>
            </details>
          </div>
        </section>
      </main>
    </div>
  );
}
