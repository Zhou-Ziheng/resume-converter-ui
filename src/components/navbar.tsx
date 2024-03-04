import { Box, Button, Flex } from "@chakra-ui/react";
import logoSvg from "../../public/logo.svg";
import Image from "next/image";

const MenuButton = ({ text }: { text: string }) => {
  return <Button variant="ghost">{text}</Button>;
};
const Navbar = () => {
  return (
    <header>
      <Box
        as="nav"
        backgroundColor="transparent"
        width="100%"
        py={4}
        margin={4}
        padding={10}
      >
        <Flex
          maxWidth="container.xl"
          marginX="auto"
          px={6}
          align="center"
          justify="space-between"
        >
          <Box>
            <Image src={logoSvg} alt="ATSify Logo" height="40" />
          </Box>
          <Box display="flex" gap="6">
            <MenuButton text="Home" />
            <MenuButton text="FAQ" />
            <MenuButton text="Contact" />
          </Box>
          <Box>
            <Button size="lg">Get Start</Button>
          </Box>
        </Flex>
      </Box>
    </header>
  );
};

export default Navbar;
