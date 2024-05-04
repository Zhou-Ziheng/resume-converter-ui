import { Box, Text } from "@chakra-ui/react";
import { ButtonInBox } from "./buttomInBox";
import { MouseEvent } from "react";
import { IoClose } from "react-icons/io5";

export default function FileBox({
  name,
  size,
  onClose,
}: {
  name: string;
  size: number;
  onClose?: () => void;
}) {
  return (
    <Box
      borderRadius="5"
      padding="3"
      bg="brand.primaryTransparent"
      border="1px solid"
      borderColor="gray.500"
      margin={2}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
    >
      <Text>{name}</Text>
      <Text>{size / 1000} KB</Text>
      {onClose && (
        <ButtonInBox
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            e.preventDefault();
            onClose();
          }}
          size="xs"
          variant="ghost"
        >
          <IoClose />
        </ButtonInBox>
      )}
    </Box>
  );
}
