"use client";

import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { useEffect, useState } from "react";
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
import { Styles, Styling } from "./styling";
import { motion, AnimatePresence } from "framer-motion";
import FileBox from "./fileBox";

const counterMachine = createMachine({
  initial: "upload",
  states: {
    upload: {
      on: {
        SUBMIT: "styling",
      },
    },
    styling: {
      on: {
        BACK: "upload",
        SUBMIT: "processing",
      },
    },
    processing: {
      on: {
        CANCEL: "styling",
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

  const [styles, setStyles] = useState<Styles>({
    mainHeader: { color: "#000000", isBold: true, isItalic: false },
    mainSubHeader: { color: "#000000", isBold: false, isItalic: false },
    sectionTitles: { color: "#000000", isBold: true, isItalic: false },
    entryHeaders: { color: "#000000", isBold: true, isItalic: false },
    bullets: { color: "#000000", isBold: false, isItalic: false },
  });

  useEffect(() => {
    const styles = localStorage.getItem("styles");
    if (styles) {
      setStyles(JSON.parse(styles));
    }
  }, []);

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

  const stylesToAPIMapper = (styles: Styles) => {
    const { mainHeader, mainSubHeader, sectionTitles, entryHeaders, bullets } =
      styles;

    return {
      header_color: mainHeader.color,
      subheader_color: mainSubHeader.color,
      section_header_color: sectionTitles.color,
      entry_title_color: entryHeaders.color,
      company_color: entryHeaders.color,
      date_color: entryHeaders.color,
      location_color: entryHeaders.color,
      project_title_color: entryHeaders.color,
      project_tools_color: entryHeaders.color,
      single_entry_color: entryHeaders.color,
      skills_color: entryHeaders.color,
      bullet_color: bullets.color,
    };
  };

  const post = ({
    fileData,
    styles,
  }: {
    fileData: string | ArrayBuffer;
    styles: Styles;
  }) => {
    const formData = new FormData();
    if (file && fileData) {
      const fileToSend = new File([fileData], file.name, {
        type: mapFileToType(file),
      });
      formData.append("file", fileToSend);
    }
    formData.append("style", JSON.stringify(stylesToAPIMapper(styles)));
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
      if (response?.status !== 200) {
        throw new Error("Failed to convert resume");
      }
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
    mutate({ fileData: fileData, styles: styles });
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
    <Container maxW="4xl">
      {state.matches("upload") && (
        <Container maxW="2xl">
          <FormControl display="flex" flexDirection="column">
            {conversionError && (
              <Text fontSize="xs" color="red" textAlign="center">
                Something went wrong, please try again or try a different file
              </Text>
            )}
            <FileUpload onDrop={validateFiles} file={file} onRemove={reset} />
            <Box display="flex" justifyContent="center">
              <Button
                type="submit"
                onClick={() => {
                  send({ type: "SUBMIT" });
                }}
                colorScheme="brandBlue"
                isDisabled={!file}
                margin={2}
                alignContent="center"
                justifyItems={"center"}
              >
                Continue
              </Button>
            </Box>
          </FormControl>
        </Container>
      )}
      {state.matches("styling") && file && (
        <Container maxW="4xl" gap="10px" display="flex" flexDirection="column">
          <Container maxW="2xl">
            <FileUpload
              onDrop={validateFiles}
              file={file}
              onRemove={reset}
              showPrompt={false}
            />
          </Container>
          <Styling styles={styles} setStyles={setStyles} />
          <Box display="flex" justifyContent="center" gap="20px">
            <Button
              type="submit"
              onClick={() => {
                send({ type: "BACK" });
              }}
              colorScheme="brandBlue"
              isDisabled={!file}
              margin={2}
              alignContent="center"
              justifyItems={"center"}
              variant={"outline"}
            >
              Back
            </Button>
            <Button
              type="submit"
              onClick={handleSubmitResume}
              colorScheme="brandBlue"
              isDisabled={!file}
              margin={2}
              alignContent="center"
              justifyItems={"center"}
            >
              Convert
            </Button>
          </Box>
        </Container>
      )}
      {state.matches("processing") && file && (
        <Container
          borderRadius="15"
          padding="5"
          display="flex"
          flexDirection="column"
          bg="brand.primaryTransparent"
        >
          <FileBox name={file.name} size={file.size} />
          <Text fontSize="xs" textAlign="center">
            This process typically takes ~20s
          </Text>
          <Box display="flex" justifyContent="center" gap="20px">
            <Button
              type="submit"
              onMouseEnter={() => setCancelHover(true)}
              onMouseLeave={() => setCancelHover(false)}
              onClick={() => {
                send({ type: "CANCEL" });
                setCancelHover(false);
              }}
              leftIcon={!cancelHover ? <Spinner size="sm" /> : undefined}
              colorScheme="brandBlue"
              margin={2}
              width="200px"
            >
              {cancelHover ? "Cancel" : "Converting"}
            </Button>
          </Box>
        </Container>
      )}
      {state.matches("download") && file && convertedFile && (
        <Container
          borderRadius="15"
          padding="5"
          display="flex"
          flexDirection="column"
          bg="brand.primaryTransparent"
        >
          <FileBox name={file.name} size={file.size} />
          <Text fontSize="xs" textAlign="center">
            Your Files are Ready
          </Text>

          <FileBox name="resume.zip" size={convertedFile.size} />
          <Popover trigger="hover">
            <PopoverTrigger>
              <Text fontSize="xs" textAlign="center" as="u">
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
          <Box display="flex" justifyContent="center" gap="20px">
            <Button
              leftIcon={<IoMdDownload />}
              colorScheme="brandBlue"
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
              colorScheme="brandBlue"
              variant="outline"
              margin={2}
            >
              New
            </Button>
          </Box>
        </Container>
      )}
    </Container>
  );
};

export default ConvertResume;
