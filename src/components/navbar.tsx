import { Box, Button, Flex } from "@chakra-ui/react";

const MenuButton = ({text}: {text: string}) => {
    return (
        <Button variant='ghost'>{text}</Button>
    )

}
const Navbar = () => {
    return (
        <Box
            as="nav"
            position="absolute"
            top={0}
            left={0}
            right={0}
            zIndex={999}
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
                <Box>ATSify</Box>
                <Box display='flex' gap="6">
                    <MenuButton text="Home" />
                    <MenuButton text="FAQ" />
                    <MenuButton text="Contact" />

                </Box>
                <Box><Button size='lg'>Get Start</Button></Box>
            </Flex>
        </Box>
    );
};

export default Navbar;