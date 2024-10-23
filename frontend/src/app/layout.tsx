import AuthContextProvider from "@/context/AuthContext";
import MycontextProvider from "@/context/Context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Loading from "./Loading";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 
  icons: {
    icon: '/favicon.ico',  // path to the favicon in the public folder
    apple: '/apple-touch-icon.png',  // optional, for apple devices
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
              <MycontextProvider>

                

      <body className={inter.className}>
      <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
      <Suspense fallback={<Loading />}>{children}</Suspense>
        </body>

      </MycontextProvider>
      </AuthContextProvider>
    </html>
  );
}
