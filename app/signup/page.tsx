"use client";
import React from "react";
import TournamentStartClock from "../components/TournamentStartClock";
import { WalletDisplay } from "../components/WalletDisplay";


const UsernameInput = () => (
  <div className="mb-4">
    <label htmlFor="username" className="block font-dmsans font-[700]">
      Choose Your Username
    </label>
    <div className="flex items-center justify-between mt-1">
      <input
        type="text"
        id="username"
        name="username"
        className="w-[70%] bg-[#F5F5F6] border border-[#D3D6DE] text-[#9C9999] rounded-md py-2 px-3"
        placeholder="@picoplayfun"
      />
      <select className="appearance-none w-[25%] bg-[#F5F5F6] border border-[#D3D6DE] text-[#9C9999] text-right py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline">
        <option value="india">🇮🇳</option>
        <option value="usa">🇺🇸</option>
        <option value="uk">🇬🇧</option>
      </select>
    </div>
  </div>
);

const XUsernameInput = () => (
  <div className="mb-4">
    <label htmlFor="x-username" className="block font-dmsans font-[700]">
      X Username
    </label>
    <input
      type="text"
      id="x-username"
      name="x-username"
      className="w-[70%] bg-[#F5F5F6] border border-[#D3D6DE] text-[#9C9999] rounded-md py-2 px-3"
      placeholder="@picoplayfun"
    />
  </div>
);

const RegisterButton = () => (
  <button
    type="button"
    className="mt-4 w-full bg-[#282E43] opacity-50 text-white rounded-full py-2 px-4 font-semibold cursor-not-allowed"
  >
    Register
  </button>
);

const SignUpPage = () => {
  return (
    <div className="mx-auto">
      <div className="max-w-md m-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-center text-2xl font-semibold mb-6">Sign up</h2>
        <WalletDisplay />
        <UsernameInput />
        <XUsernameInput />
        <RegisterButton />
        <p className="text-center text-sm text-[#C1C1C1] mt-4">
          Tournament details on the next step
        </p>
      </div>
      <div className="m-8">
        <TournamentStartClock />
      </div>
    </div>
  );
};

export default SignUpPage;
