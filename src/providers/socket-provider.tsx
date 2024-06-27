"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Socket, io } from "socket.io-client";
import {
  answerAtom,
  finishedAtom,
  questionAtom,
} from "../store/atoms/quizAtoms";
import {
  AnswerWithResponse,
  QuestionWithTime as Question,
} from "@/backend/src/Types";
import { SocketChannels } from "@/backend/src/constants";
import { tokenAtom } from "../store/atoms/appAtoms";

export interface SocketContextType {
  socket: Socket | null;
  setSocket: any;
}
const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const setQuestion = useSetRecoilState(questionAtom);
  const setAnswer = useSetRecoilState(answerAtom);
  const setFinished = useSetRecoilState(finishedAtom);
  const token = useRecoilValue(tokenAtom);

  useEffect(() => {
    if (!token) {
      return;
    }
    // Connect to the WebSocket server
    const socketInstance: Socket = io(
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
      {
        extraHeaders: {
          authorization: `bearer ${token}`,
        },
      }
    );
    setSocket(socketInstance);

    socketInstance.on(SocketChannels.QUESTION, (data: Question) => {
      setQuestion(data);
      setAnswer(null);
    });

    socketInstance.on(SocketChannels.ANSWER, (data: AnswerWithResponse) => {
      setAnswer(data);
      setQuestion(null);
    });

    socketInstance.on(SocketChannels.TOURNAMENT_COMPLETED, (data) => {
      //TODO: finished should contain the number of correct / incorrect
      setFinished(true);
      setQuestion(null);
      setAnswer(null);
    });

    socketInstance.on(SocketChannels.TOURNAMENT_STARTED, (data) => {
      //TODO: finished should contain the number of correct / incorrect
      setFinished(false);
    });

    // Cleanup on unmount
    return () => {
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  return useContext(SocketContext);
};
