import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import { QueryClientProvider } from "@/components/queryClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATSify",
  description: "Make Your Resume ATS Friendly",
};

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <QueryClientProvider>{children}</QueryClientProvider>
    </ChakraProvider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
