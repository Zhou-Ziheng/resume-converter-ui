import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ChakraProvider, ColorModeScript, DarkMode } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import { QueryClientProvider } from "@/components/queryClient";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ATSify",
  description: "Make Your Resume ATS Friendly",
};

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
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
          <Analytics />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
