import { atom } from "recoil";

export const usernameAtom = atom({
  key: "usernameAtom",
  default: "",
});

export const xUsernameAtom = atom({
  key: "xUsernameAtom",
  default: "",
});

export const countryAtom = atom({
  key: "countryAtom",
  default: "india",
});
