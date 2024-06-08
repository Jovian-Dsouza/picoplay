import React from "react";
import Link from "next/link";
import { WalletButton } from "../providers/solana-provider";

export function Logo() {
  return (
    <Link href="/" aria-label="logo" className="flex space-x-2 items-center">
      <img src="/picoplay.png" alt="logo" className="h-4 md:h-8 " />
      {/* TODO: change font to Armin Grotesk */}
      <span className="text-lg md:text-xl font-bold text-[#404040]">
        Picoplay
      </span>
    </Link>
  );
}

function Header() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6 w-full my-3">
      <div className="relative flex items-center justify-between header-bg-border">
        <Logo />
        <WalletButton/>
      </div>
    </div>
  );
}

export default Header;
