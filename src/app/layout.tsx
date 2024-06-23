import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Header";
import { ReactQueryProvider } from "@/src/providers/react-query-provider";
import { SolanaProvider } from "@/src/providers/solana-provider";
import Footer from "@/src/components/Footer";
import { RecoilProvider } from "@/src/providers/recoil-privoder";
import { CustomWalletProvider } from "@/src/providers/custom-wallet-provider";
import { SocketProvider } from "../providers/socket-provider";

const inter = Inter({ subsets: ["latin"] });
const dmsans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-dmsans",
});

export const metadata: Metadata = {
  title: "Pico Play",
  description: "Pico Play",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dmsans.variable}`}>
        <ReactQueryProvider>
          <RecoilProvider>
            <SolanaProvider>
              <CustomWalletProvider>
                <SocketProvider>
                  <div className="flex flex-col justify-between min-h-screen bg-[#F8FBFF] text-black">
                    <div className="flex flex-col ">
                      <Header />
                      {children}
                    </div>
                    <Footer />
                  </div>
                </SocketProvider>
              </CustomWalletProvider>
            </SolanaProvider>
          </RecoilProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
