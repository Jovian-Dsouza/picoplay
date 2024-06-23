import nacl from "tweetnacl";
import { PublicKey } from "@solana/web3.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;
const SIGN_MESSAGE = "Sign into Picoplay";

const router = Router();

const createJwtToken = (walletAddress: string): string => {
  return jwt.sign({ userId: walletAddress }, JWT_SECRET);
};

const verifySignature = (
  message: Uint8Array,
  signature: { data: number[] },
  walletAddress: string
): boolean => {
  return nacl.sign.detached.verify(
    message,
    new Uint8Array(signature.data),
    new PublicKey(walletAddress).toBytes()
  );
};

router.post("/checkuser", async (req, res) => {
  try {
    const { wallet_address } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { wallet_address },
    });

    return res.json({ userFound: !!existingUser });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ message: "Internal server error"})
  }
});

router.post("/login", async (req, res) => {
    try {
      const { wallet_address, signature } = req.body;
      const message = new TextEncoder().encode(SIGN_MESSAGE);

      if (!verifySignature(message, signature, wallet_address)) {
        return res.status(401).json({ message: "Incorrect signature" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { wallet_address },
      });

      if (existingUser) {
        const token = createJwtToken(existingUser.wallet_address);
        return res.json({ token });
      } else {
        return res
          .status(400)
          .json({ message: "User not found, please signup" });
      }
    } catch (error) {
      console.error("Error checking user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/signin", async (req, res) => {
    try {
      const { wallet_address, signature, username, x_username, country_name } =
        req.body;
      const message = new TextEncoder().encode(SIGN_MESSAGE);

      if (!verifySignature(message, signature, wallet_address)) {
        return res.status(401).json({ message: "Incorrect signature" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { wallet_address },
      });

      if (existingUser) {
        const token = createJwtToken(existingUser.wallet_address);
        return res.json({ token });
      }

      if (!username || !country_name) {
        return res
          .status(400)
          .json({ message: "Username and country name are required" });
      }

      const newUser = await prisma.user.create({
        data: { wallet_address, username, x_username, country_name },
      });

      const token = createJwtToken(newUser.wallet_address);
      return res.json({ token });
    } catch (error) {
      console.error("Error checking user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
});

export default router;
