import axios from "axios";

export const checkUser = async (wallet_address: string): Promise<boolean> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/checkuser`,
    {
      wallet_address: wallet_address,
    }
  );
  if (response && response.status === 200) {
    return response.data.userFound as boolean;
  }
  return false;
};

export const loginUser = async (
  wallet_address: string,
  signature: any
): Promise<string | null> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/login`,
    {
      signature,
      wallet_address: wallet_address,
    }
  );
  if (response && response.status === 200) {
    return response.data.token;
  }
  return null;
};

export const signinUser = async (
  wallet_address: string,
  username: string,
  x_username: string,
  country_name: string,
  signature: any
): Promise<string | null> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/signin`,
    {
      signature,
      wallet_address: wallet_address,
      username,
      x_username,
      country_name,
    }
  );
  if (response && response.status === 200) {
    return response.data.token;
  }
  return null;
};
