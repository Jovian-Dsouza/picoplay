"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { WalletButton } from "../providers/solana-provider";
import { getAuthDetails, storeAuthDetails } from "../utils/storage-helper";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "@/app/store/atoms/appAtoms";
import { useRouter } from "next/navigation";
import { checkUser, loginUser } from "../utils/api-helpter";
import { useCustomWallet } from "../providers/custom-wallet-provider";

export function Logo() {
  return (
    <Link href="/" aria-label="logo" className="flex space-x-2 items-center">
      <img src="/picoplay.png" alt="logo" className="h-4 md:h-8" />
      {/* TODO: change font to Armin Grotesk */}
      <span className="text-lg md:text-xl font-bold text-[#404040]">
        Picoplay
      </span>
    </Link>
  );
}

function Header() {
  const { walletAddress, getSignature } = useCustomWallet();
  const setToken = useSetRecoilState(tokenAtom);
  const router = useRouter();

  async function login() {
    if (!walletAddress) {
      return;
    }

    //Check token from local storage
    const authDetailsFromStorage = await getAuthDetails();
    if (
      authDetailsFromStorage &&
      authDetailsFromStorage.wallet_address === walletAddress &&
      authDetailsFromStorage.token
    ) {
      setToken(authDetailsFromStorage.token);
      return;
    }

    //Check if user has already signed up
    const signature = await getSignature();
    if (await checkUser(walletAddress)) {
      const token = await loginUser(walletAddress, signature);
      if (token) {
        storeAuthDetails({
          token,
          wallet_address: walletAddress,
        });
      } else {
        //TODO show error modal
        console.error("Failed to Login in");
      }
    } else {
      //Redirect to signup page
      router.push("/signup");
    }
  }

  useEffect(() => {
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  return (
    <div className="mx-auto px-6 py-2 md:px-12 xl:px-6 w-full mt-3 border-b-2">
      <div className="relative flex items-center justify-between header-bg-border  ">
        <Logo />
        <WalletButton />
      </div>
    </div>
  );
}

export default Header;
