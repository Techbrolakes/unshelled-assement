"use client";

import "react-toastify/dist/ReactToastify.css";
import "../theme/global.css";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <body className={"bg-[#1C1E32] px-6 py-4"}>
          <NextTopLoader showSpinner={false} color="#000" height={4} />
          <ToastContainer />

          <Suspense>{children}</Suspense>
        </body>
      </html>
    </QueryClientProvider>
  );
}
