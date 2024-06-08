import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ReactQueryProvider } from "./providers/react-query-provider";
import { SolanaProvider } from "./providers/solana-provider";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <ReactQueryProvider>
          <SolanaProvider>
            <div className="flex flex-col justify-between min-h-screen bg-white">
              <div className="flex flex-col">
                <Header />
                {children}
              </div>
            </div>
          </SolanaProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
