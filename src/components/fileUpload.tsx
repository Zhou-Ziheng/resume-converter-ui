import { MouseEvent, ReactNode, useRef } from "react";
import {
  Box,
  Button,
  Text,
  FormErrorMessage,
  FormLabel,
  Icon,
  InputGroup,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";
import { IoCloudDownloadOutline, IoClose } from "react-icons/io5";
import { GoPaperclip } from "react-icons/go";
import { useDropzone } from "react-dropzone";
import { ButtonInBox } from "./buttomInBox";
import FileBox from "./fileBox";

type FileUploadProps = {
  onDrop: (files: File[]) => void;
  showPrompt?: boolean;
  file?: File | null;
  onRemove: () => void;
};

const FileUpload = ({
  file,
  showPrompt = true,
  onDrop,
  onRemove,
}: FileUploadProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "text/plain": [".txt"],
    },
  });

  return (
    <Box
      {...getRootProps()}
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      alignItems="center"
      gap={2}
      border="1px dashed"
      borderRadius={10}
      borderColor="brandBlue.500"
      padding={4}
      paddingTop={!file ? 20 : undefined}
      paddingBottom={!file ? 20 : undefined}
      margin={2}
      bg={
        isDragActive ? "brand.secondaryTransparent" : "brand.primaryTransparent"
      }
      transition="background-color 0.3s ease-in-out"
      _hover={{
        bg: "brand.secondaryTransparent",
      }}
    >
      <input {...getInputProps()} />
      {file && (
        <FileBox
          name={file.name}
          size={file.size}
          onClose={showPrompt ? onRemove : undefined}
        />
      )}

      {showPrompt && (
        <>
          <IoCloudDownloadOutline size={32} />
          <Text>Drag n&apos; Drop Resume Here</Text>
          <Text fontSize="xs">or</Text>
          <Button
            backgroundColor="brand.primaryTransparent"
            leftIcon={<GoPaperclip />}
            size="xs"
            _hover={{
              bg: "brand.secondaryTransparent",
            }}
            _active={{
              bg: "brandBlue.600",
            }}
          >
            Browse File
          </Button>
        </>
      )}
    </Box>
  );
};

export default FileUpload;
