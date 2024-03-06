import { ReactNode, useRef } from "react";
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

type FileUploadProps = {
  onDrop: (files: File[]) => void;
  file?: File | null;
  onRemove: () => void;
};

const FileUpload = ({ file, onDrop, onRemove }: FileUploadProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": ["pdf"],
      "application/msword": ["doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        ["docx"],
      "image/jpeg": ["jpg", "jpeg"],
      "image/png": ["png"],
      "text/plain": ["txt"],
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
      border="1px dashed #FFFFFF55"
      borderRadius={10}
      padding={4}
      margin={2}
      bg={isDragActive ? "#FFFFFF11" : undefined}
      transition="background-color 0.3s ease-in-out"
      _hover={{ bg: "#FFFFFF11" }}
    >
      <input {...getInputProps()} />
      {file && (
        <Box
          borderRadius="5"
          padding="3"
          bg="#FFFFFF11"
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text>{file.name}</Text>
          <Text>{file.size / 1000} KB</Text>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove();
            }}
            size="xs"
            variant="ghost"
          >
            <IoClose />
          </Button>
        </Box>
      )}

      <>
        <IoCloudDownloadOutline size={32} color="#74bb88" />

        <Text>Drag&Drop Resume Here</Text>
        <Text fontSize="xs" color="#FFFFFF66">
          or
        </Text>
        <Button leftIcon={<GoPaperclip />} size="xs">
          Choose File
        </Button>
      </>
    </Box>
  );
};

export default FileUpload;
