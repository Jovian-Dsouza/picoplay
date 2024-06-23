import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ReactQueryProvider } from "./providers/react-query-provider";
import { SolanaProvider } from "./providers/solana-provider";
import Footer from "./components/Footer";
import { RecoilProvider } from "./providers/recoil-privoder";

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
              <div className="flex flex-col justify-between min-h-screen bg-[#F8FBFF] text-black">
                <div className="flex flex-col ">
                  <Header />
                  {children}
                </div>
                <Footer />
              </div>
            </SolanaProvider>
          </RecoilProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
