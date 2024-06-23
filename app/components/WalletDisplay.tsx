import { useWallet } from "@solana/wallet-adapter-react";

const WalletStatus = ({ connected }: { connected: boolean }) => (
  <div className="flex items-center space-x-2 mr-2">
    <span className="font-dmsans font-[700]">
      {connected ? "Wallet Connected" : "Wallet Disconnected"}
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <circle
        opacity="0.3"
        cx="5"
        cy="5"
        r="5"
        fill={connected ? "#0EC6B0" : "#FF6B6B"}
      />
      <circle cx="5" cy="5" r="2" fill={connected ? "#0EC6B0" : "#FF6B6B"} />
    </svg>
  </div>
);

const WalletAddress = ({ address }: { address: string | null }) => {
  if(!address){return <div className="text-gray-400">Please connect wallet</div>}
  return (
  <div
    className={`text-center w-[60%] bg-[#DAE6FF] text-[#4785FF] font-dmsans font-[700] rounded-md px-3 py-2 cursor-pointer`}
  >
    {`${address.slice(0, 4)}...${address.slice(-4)}`}
  </div>
)};

export function WalletDisplay() {
  const { publicKey, connected } = useWallet();
  const walletAddress = publicKey ? publicKey.toString() : null;

  return (
    <div className="flex flex-col space-y-2 mb-4">
      <WalletStatus connected={connected} />
      <WalletAddress address={walletAddress} />
    </div>
  );
}
