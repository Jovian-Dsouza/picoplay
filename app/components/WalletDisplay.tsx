const WalletStatus = () => (
  <div className="flex items-center space-x-2 mr-2">
    <span className="font-dmsans font-[700]">Wallet Connected</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
      <circle opacity="0.3" cx="5" cy="5" r="5" fill="#0EC6B0" />
      <circle cx="5" cy="5" r="2" fill="#0EC6B0" />
    </svg>
  </div>
);

const WalletAddress = () => (
  <div className="w-[60%] bg-[#DAE6FF] text-[#4785FF] font-dmsans font-[700] rounded-md p-3">
    {/* TODO replace with actual wallet address  */}
    4FJSq...dlF79
  </div>
);

export function WalletDisplay() {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <WalletStatus />
      <WalletAddress />
    </div>
  );
}
