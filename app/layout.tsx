import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Project 1",
  description:
    "My attempt at coding a nextjs project out of what I have learned",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ToastContainer />
        <main className="app">
          {/* <div className="gradient"></div> */}
          <nav className="bg-gray-800">
            <div className="container mx-auto p-2">
              <Link href="/">
                <h2 className="text-white text-2xl font-bold">React CRUD</h2>
              </Link>
            </div>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
