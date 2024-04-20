"use client";

import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import logoSvg from "../../public/logo.svg";
import Image from "next/image";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

const MenuButton = ({ text }: { text: string }) => {
  return <Button variant="ghost">{text}</Button>;
};
const Navbar = () => {
  const menuItems = [{ text: "Home" }, { text: "FAQ" }, { text: "Contact" }];

  const isDesktop = useBreakpointValue({ base: false, md: true });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header>
      {isDesktop && (
        <Box
          as="nav"
          backgroundColor="transparent"
          width="100%"
          margin={0}
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
              {menuItems.map((item) => (
                <MenuButton key={item.text} text={item.text} />
              ))}
            </Box>
            <Box>
              <Button size="lg">Get Start</Button>
            </Box>
          </Flex>
        </Box>
      )}
      {!isDesktop && (
        <Box
          as="nav"
          backgroundColor="transparent"
          width="100%"
          py={4}
          mb={14}
          padding={4}
          background={"#212121"}
          borderBottom={"1px solid #383838"}
        >
          <Flex
            maxWidth="container.xl"
            marginX="auto"
            px={6}
            align="center"
            justify="space-between"
          >
            <Button variant="ghost">
              <MdMenu size={40} />
            </Button>
            <Box>
              <Image src={logoSvg} alt="ATSify Logo" height="40" />
            </Box>
          </Flex>
        </Box>
      )}
      {
        <Drawer
          placement="left"
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        >
          <DrawerOverlay />
          <DrawerContent minW="100vw">
            <DrawerCloseButton />
          </DrawerContent>
        </Drawer>
      }
    </header>
  );
};

export default Navbar;
