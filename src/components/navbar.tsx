import { Box, Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/react";
import logoSvg from "../../public/logo.svg";
import Image from "next/image";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const theme = useTheme();
  const primaryBrandColor = theme.colors.brand.primary;
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
            <a href="/">
              <Image
                src={logoSvg}
                alt="ATSify Logo"
                height="40"
                color={primaryBrandColor}
              />
            </a>
          </Box>
          <Box display="flex" gap="6">
            {/* <MenuButton text="Home" />
            <MenuButton text="FAQ" />
            <MenuButton text="Contact" /> */}
            {/* <Button onClick={toggleColorMode}>
              Toggle {colorMode === "light" ? "Dark" : "Light"}
            </Button> */}
          </Box>
          <Box display="flex">
            {/* <Button width="unset" height="unset" padding="10px" variant="ghost">
              <Text
                color="brand.primary"
                fontFamily="ibm plex serif"
                fontSize="3xl"
              >
                FAQ
              </Text>
            </Button> */}
            <DarkModeSwitch
              checked={colorMode === "dark"}
              onChange={toggleColorMode}
              size={50}
              moonColor={primaryBrandColor}
              sunColor={primaryBrandColor}
            />
          </Box>
        </Flex>
      </Box>
    </header>
  );
};

export default Navbar;
