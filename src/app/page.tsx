"use client";

import { Box, Container, Heading, Text, useTheme } from "@chakra-ui/react";
import ConvertResume from "@/components/convertResume";
import { useToken } from "@chakra-ui/react";

const Home = () => {
  const theme = useTheme();
  const primaryBrandColor = theme.colors.brand.primary;

  return (
    <Box display="flex" flexDirection="column" width="100vw" gap="4px">
      <Heading fontSize="5xl" fontWeight="600" textAlign="center">
        Make Your Resume{" "}
        <i style={{ color: primaryBrandColor }}>Professional</i>
      </Heading>
      <Text fontSize="md" textAlign="center" marginTop="2">
        Add your resume and convert to PDF and Latex format
      </Text>
      <Container marginTop="8" maxW="4xl">
        <ConvertResume />
      </Container>
      <Box height="100px" />
    </Box>
  );
};

export default Home;
