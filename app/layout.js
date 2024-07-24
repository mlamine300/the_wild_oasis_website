import { Inter } from "next/font/google";
import "@/app/_styles/globals.css";
import Navigation from "./_components/Navigation";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ResevationProvider } from "./_context/ReservationContext";
const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });
console.log(josefin);
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "the wild ouasis",
  description: "luxurius hotel in the sahara",
  icon: "favicon.ico",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-primary-950 text-primary-100
       min-h-screen flex flex-col antialiased
      `}
      >
        <header>
          <Header />
        </header>
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto">
            <ResevationProvider>{children}</ResevationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
