"use client";

import { createContext, useContext, useMemo } from "react";
import { SIGN_MESSAGE } from "../constants";
import { useWallet } from "@solana/wallet-adapter-react";

const CustomWalletContext = createContext();

export function CustomWalletProvider({ children }) {
  const { publicKey, signMessage } = useWallet();
  const walletAddress = useMemo(
    () => (publicKey ? publicKey.toString() : null),
    [publicKey]
  );

  async function getSignature() {
    const message = new TextEncoder().encode(SIGN_MESSAGE);
    const signature = await signMessage?.(message);
    return signature;
  }

  return (
    <CustomWalletContext.Provider value={{ walletAddress, getSignature }}>
      {children}
    </CustomWalletContext.Provider>
  );
}

export const useCustomWallet = () => {
  return useContext(CustomWalletContext);
};
