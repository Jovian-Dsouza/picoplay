"use client";
import React from "react";
import TournamentStartClock from "../components/TournamentStartClock";

export default function SignUpPage() {
  return (
    <div className="mx-auto">
      <div className="max-w-md m-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-center text-2xl font-semibold mb-6">Sign up</h2>
        <div className="flex flex-col space-y-2 mb-4">
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
          <div className="w-[60%] bg-[#DAE6FF] text-[#4785FF] font-dmsans font-[700] rounded-md p-3">
            4FJSq...dlF79
          </div>
        </div>
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
        <button
          type="button"
          className="mt-4 w-full bg-[#282E43] opacity-50 text-white rounded-full py-2 px-4 font-semibold cursor-not-allowed"
        >
          Register
        </button>
        <p className="text-center text-sm text-[#C1C1C1] mt-4">
          tournament details on the next step
        </p>
      </div>
      <div className="m-8">
        <TournamentStartClock />
      </div>
    </div>
  );
}
