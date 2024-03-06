"use client";

import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { set, useForm } from "react-hook-form";
import FileUpload from "./fileUpload";
import { ChevronRightIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { FaPlus } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { IoMdDownload } from "react-icons/io";

const counterMachine = createMachine({
  initial: "upload",
  states: {
    upload: {
      on: {
        SUBMIT: "processing",
      },
    },
    processing: {
      on: {
        CANCEL: "upload",
        READY: "download",
      },
    },
    download: {
      on: {
        NEW: "upload",
      },
    },
  },
});

type FormValues = {
  file_: FileList;
};

const ConvertResume = () => {
  const [state, send] = useMachine(counterMachine);
  const [file, setFile] = useState<File | null>(null);
  const [conversionError, setConversionError] = useState<string | null>(null);
  const [fileData, setFileData] = useState<string | ArrayBuffer | null>(null);
  const [cancelHover, setCancelHover] = useState(false);
  const [convertedFile, setConvertedFile] = useState<Blob | null>(null);

  const reset = () => {
    setFile(null);
    setFileData(null);
    setConversionError(null);
    setCancelHover(false);
    setConvertedFile(null);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const validateFile = (file: File) => {
    if (file.size > 1000000) {
      alert("File size must be less than 1MB");
      return false;
    }

    const supportedTypes = ["pdf", "jpg", "jpeg", "png", "docx", "doc", "txt"];

    const fileType = file.name.split(".").pop();
    if (fileType && !supportedTypes.includes(fileType)) {
      alert("File type not supported");
      return false;
    }

    return true;
  };

  const mapFileToType = (file: File) => {
    const fileType = file.name.split(".").pop();
    if (fileType == "pdf") {
      return "application/pdf";
    } else if (fileType == "jpg" || fileType == "jpeg") {
      return "image/jpeg";
    } else if (fileType == "png") {
      return "image/png";
    } else if (fileType == "docx") {
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    } else if (fileType == "doc") {
      return "application/msword";
    } else if (fileType == "txt") {
      return "text/plain";
    }

    return "";
  };
  const post = (fileData: string | ArrayBuffer) => {
    const formData = new FormData();
    if (file && fileData) {
      const fileToSend = new File([fileData], file.name, {
        type: mapFileToType(file),
      });
      formData.append("file", fileToSend);
    }
    // https://api.resume.tonyzhou.ca
    // http://localhost:5000
    return fetch("https://api.resume.tonyzhou.ca/v1/convert", {
      method: "POST",
      body: formData,
    });
  };

  const { mutate } = useMutation({
    mutationFn: post,
    onSuccess: async (response: any) => {
      if (state.matches("processing")) {
        const blob = await response.blob();
        setConvertedFile(blob);
        send({ type: "READY" });
      }
    },
    onError: (error: unknown) => {
      setConversionError(`${error}`);
      send({ type: "CANCEL" });
    },
  });

  const handleSubmitResume = () => {
    if (!fileData) {
      alert("Please upload your Resume");
      return;
    }
    mutate(fileData);
    send({ type: "SUBMIT" });
  };

  async function downloadBlobAsZip(blob: Blob, fileName: string) {
    // Create a URL for the Blob object
    const url = window.URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);

    // Click the link to trigger the download
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  const validateFiles = (acceptedFiles: File[]) => {
    const firstFile = acceptedFiles[0];

    if (firstFile && validateFile(firstFile)) {
      setFile(firstFile);
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setFileData(binaryStr);
      };
      reader.readAsArrayBuffer(firstFile);
    }
  };

  return (
    <Container backgroundColor="#00000090" borderRadius="15" padding="5">
      {state.matches("upload") && (
        <FormControl display="flex" flexDirection="column">
          {conversionError && (
            <Text fontSize="xs" color="red" textAlign="center">
              Something went wrong, please try again or try a different file
            </Text>
          )}
          <FileUpload onDrop={validateFiles} file={file} onRemove={reset} />
          <Button
            type="submit"
            onClick={handleSubmitResume}
            colorScheme="green"
            isDisabled={!file}
            margin={2}
            alignContent="center"
            justifyItems={"center"}
            rightIcon={<ChevronRightIcon />}
          >
            Convert
          </Button>
        </FormControl>
      )}
      {state.matches("processing") && file && (
        <Box display="flex" flexDirection="column">
          <Box
            borderRadius="5"
            padding="3"
            margin={2}
            bg="#FFFFFF11"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>{file.name}</Text>
            <Text>{file.size / 1000} KB</Text>
          </Box>
          <Text fontSize="xs" color="#FFFFFF66" textAlign="center">
            This process typically takes ~10s
          </Text>
          <Button
            type="submit"
            onMouseEnter={() => setCancelHover(true)}
            onMouseLeave={() => setCancelHover(false)}
            onClick={() => {
              send({ type: "CANCEL" });
              setCancelHover(false);
            }}
            leftIcon={!cancelHover ? <Spinner size="sm" /> : undefined}
            colorScheme="green"
            margin={2}
          >
            {cancelHover ? "Cancel" : "Converting"}
          </Button>
        </Box>
      )}
      {state.matches("download") && file && convertedFile && (
        <Box display="flex" flexDirection="column">
          <Box
            borderRadius="5"
            padding="3"
            margin={2}
            bg="#FFFFFF11"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>{file.name}</Text>
            <Text>{file.size / 1000} KB</Text>
          </Box>
          <Text fontSize="xs" textAlign="center">
            Your Files are Ready
          </Text>

          <Box
            borderRadius="5"
            padding="3"
            margin={2}
            bg="#FFFFFF11"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>resume.zip</Text>
            <Text>{convertedFile.size / 1000} KB</Text>
          </Box>
          <Popover trigger="hover">
            <PopoverTrigger>
              <Text fontSize="xs" color="#FFFFFF66" textAlign="center" as="u">
                Why am I downloading a zip?
              </Text>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                The zip file includes a LaTeX file and a compiled PDF. Since the
                parsing is not perfect, you may want to edit the LaTeX file
                directly
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Button
            leftIcon={<IoMdDownload />}
            colorScheme="green"
            margin={2}
            onClick={() => {
              downloadBlobAsZip(convertedFile, "resume.zip");
            }}
          >
            Download
          </Button>
          <Button
            leftIcon={<FaPlus />}
            onClick={() => {
              reset();
              send({ type: "NEW" });
            }}
            colorScheme="green"
            variant="outline"
            margin={2}
          >
            New
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ConvertResume;
