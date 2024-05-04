"use client";

import type { Metadata } from "next";
import "./globals.scss";
import { useColorMode } from "@chakra-ui/react";
import {
  ChakraProvider,
  ColorModeScript,
  ThemeConfig,
  extendTheme,
} from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import { QueryClientProvider } from "@/components/queryClient";
import Footer from "@/components/footer";
import { Analytics } from "@vercel/analytics/react";
import "@fontsource/ibm-plex-serif";
// import "@fontsource/inter";

const metadata: Metadata = {
  title: "ATSify",
  description: "Make Your Resume ATS Friendly",
};
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    primary: "#3077d2",
    secondary: "#64a8ef",
    primaryTransparent: "#3077d232",
    secondaryTransparent: "#64a8ef32",
  },

  brandBlue: {
    50: "#e7f3fe",
    100: "#bbd9f7",
    200: "#8fc1f2",
    300: "#64a8ef",
    400: "#4091ec",
    500: "#3077d2",
    600: "#255da3",
    700: "#1a4273",
    800: "#0d2845",
    900: "#010d18",
  },
};

// const colors = {
//   brand: {
//     primary: "#7a7a7a",
//     secondary: "#adadad",
//     primaryTransparent: "#7a7a7a32",
//     secondaryTransparent: "#adadad32",
//   },

//   brandBlue: {
//     50: "#eaeaea",
//     100: "#d6d6d6",
//     200: "#c1c1c1",
//     300: "#adadad",
//     400: "#999999",
//     500: "#7a7a7a",
//     600: "#5a5a5a",
//     700: "#3b3b3b",
//     800: "#1b1b1b",
//     900: "#000000",
//   },
// };
const theme = extendTheme({
  colors,
  fonts: {
    heading: "ibm plex serif, serif",
    body: "Inter, serif",
  },
  components: {
    Table: {
      baseStyle: {
        th: {
          fontFamily: "ibm plex serif, serif",
          border: "none",
        },
        td: {
          fontFamily: "ibm plex serif, serif",
          border: "none",
        },
      },
    },
  },
  ...config,
});

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
