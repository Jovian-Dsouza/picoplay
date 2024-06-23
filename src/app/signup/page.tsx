"use client";
import React from "react";
import TournamentStartClock from "@/src/components/clocks/TournamentStartClock";
import { WalletDisplay } from "@/src/components/WalletDisplay";
import {
  usernameAtom,
  xUsernameAtom,
  countryAtom,
} from "@/src/store/atoms/signUpAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { storeAuthDetails } from "@/src/utils/storage-helper";
import { signinUser } from "@/src/utils/api-helpter";
import { useCustomWallet } from "@/src/providers/custom-wallet-provider";

const UsernameInput = () => {
  const [username, setUsername] = useRecoilState(usernameAtom);
  const [country, setCountry] = useRecoilState(countryAtom);

  return (
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select
          className="appearance-none w-[25%] bg-[#F5F5F6] border border-[#D3D6DE] text-[#9C9999] text-right py-2 px-3 rounded leading-tight focus:outline-none focus:shadow-outline"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="india">🇮🇳</option>
          <option value="usa">🇺🇸</option>
          <option value="uk">🇬🇧</option>
        </select>
      </div>
    </div>
  );
};

const XUsernameInput = () => {
  const [xUsername, setXUsername] = useRecoilState(xUsernameAtom);

  return (
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
        value={xUsername}
        onChange={(e) => setXUsername(e.target.value)}
      />
    </div>
  );
};

const RegisterButton = ({ onClick }: { onClick: any }) => (
  <button
    type="button"
    className="mt-4 w-full bg-[#282E43] text-white rounded-full py-2 px-4 font-semibold cursor-pointer"
    onClick={onClick}
  >
    Register
  </button>
);

const SignUpPage = () => {
  const { walletAddress, getSignature } = useCustomWallet();

  const username = useRecoilValue(usernameAtom);
  const xUsername = useRecoilValue(xUsernameAtom);
  const country = useRecoilValue(countryAtom);

  async function registerUser() {
    if (!walletAddress) {
      return;
    }
    try {
      const signature = await getSignature();
      const token = await signinUser(
        walletAddress,
        username,
        xUsername,
        country,
        signature
      );
      if (token) {
        storeAuthDetails({
          token,
          wallet_address: walletAddress,
        });
      } else {
        //TODO show error modal
        console.error("Failed to sign and send");
      }
    } catch (error) {
      //TODO show error modal
      console.error("Failed to sign and send", error);
    }
  }

  return (
    <div className="mx-auto">
      <div className="max-w-md m-6 bg-white shadow-md rounded-md p-6">
        <h2 className="text-center text-2xl font-semibold mb-6">Sign up</h2>
        <WalletDisplay />
        <UsernameInput />
        <XUsernameInput />
        <RegisterButton onClick={registerUser} />
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
