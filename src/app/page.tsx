import Image from "next/image";
import styles from "./page.module.css";
import { Box, Center, Container, Text } from "@chakra-ui/react";
import Navbar from "@/components/navbar";
import ConvertResume from "@/components/convertResume";

export default function Home() {
  return (
    <Box display='flex' flexDirection='column' marginTop='150px' width="100vw">
      <Text color="#74bb88" fontSize="6xl" fontWeight="400" textAlign='center'>Make Your Resume</Text>
      <Text fontSize="6xl" fontWeight="600" textAlign='center'>ATS Friendly</Text>
      <Text fontSize="md" textAlign='center' marginTop='2' color="#FFFFFF66">Convert your resume into Latex and PDF format</Text>
      <Container marginTop="8">
        <ConvertResume />
      </Container>
    </Box>
  );
}
