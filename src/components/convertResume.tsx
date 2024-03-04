"use client";

import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  Icon,
  Input,
  InputGroup,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import FileUpload from "./fileUpload";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useMutation } from "@tanstack/react-query";

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

  const reset = () => {
    setFile(null);
    setFileData(null);
    setConversionError(null);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log("On Submit: ", data));

  const validateFile = (file: File) => {
    if (file.size > 1000000) {
      alert("File size must be less than 1MB");
      return false;
    }

    const supportedTypes = ["pdf", "jpg", "jpeg", "png"];

    const fileType = file.name.split(".").pop();
    if (fileType && !supportedTypes.includes(fileType)) {
      alert("File type not supported");
      return false;
    }

    return true;
  };

  const post = (fileData: string | ArrayBuffer) => {
    const formData = new FormData();
    if (fileData) {
      formData.append("file", new Blob([fileData]));
    }
    return fetch("https://api.resume.tonyzhou.ca/api/convertResume", {
      method: "POST",
      body: formData,
    });
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: post,
    onSuccess: (data: unknown) => {
      console.log(data);
    },
    onError: (error: unknown) => {
      setConversionError(`${error}`);
    },
  });

  const handleSubmitResume = () => {
    console.log('a')
    if (!fileData) {
      alert("Please upload your Resume");
      return;
    }
    mutate(fileData);
    send({ type: "SUBMIT" });
  };

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
        <FormControl
          display="flex"
          flexDirection="column"
        >
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
      {state.matches("processing") && (
        <Box>
            processing
        </Box>
      )}
    </Container>
  );
};

export default ConvertResume;
