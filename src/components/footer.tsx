"use client";

import { Text, Box, Link } from "@chakra-ui/react";
import NextLink from "next/link";

const Footer = () => {
  return (
    <footer style={{ position: "absolute", bottom: 0, width: "100%" }}>
      <Box margin="4" display="flex" flexDirection="column">
        <Text fontSize="sm" textAlign="center">
          © 2024 ATSify
        </Text>
        <Text fontSize="xs" textAlign="center">
          By using ATSify, you agree to our{" "}
          <NextLink href="/terms">
            <Link
              textDecoration="underline"
              _hover={{
                fontWeight: "bold",
              }}
            >
              Terms of Service
            </Link>
          </NextLink>{" "}
          and{" "}
          <NextLink href="/privacy">
            <Link
              textDecoration="underline"
              _hover={{
                fontWeight: "bold",
              }}
            >
              Privacy Policy
            </Link>
          </NextLink>
        </Text>
      </Box>
    </footer>
  );
};

export default Footer;
