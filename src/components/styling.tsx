import {
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { ChromePicker } from "react-color";
import { FaCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { GrPowerReset } from "react-icons/gr";

export interface TextBlockStyle {
  color: string;
  isBold: boolean;
  isItalic: boolean;
}
export interface Styles {
  mainHeader: TextBlockStyle;
  mainSubHeader: TextBlockStyle;
  sectionTitles: TextBlockStyle;
  entryHeaders: TextBlockStyle;
  bullets: TextBlockStyle;
}

export const keyMapper: Record<any, string> = {
  mainHeader: "Main Header",
  mainSubHeader: "Main Sub Header",
  sectionTitles: "Section Titles",
  entryHeaders: "Entry Headers",
  bullets: "Bullets",
};

export const Styling = ({
  styles,
  setStyles,
}: Readonly<{
  styles: Styles;
  setStyles: React.Dispatch<React.SetStateAction<Styles>>;
}>) => {
  const setStyleAndSaveToStorage = (style: Styles) => {
    setStyles(style);
    localStorage.setItem("styles", JSON.stringify(style));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <Table variant="simple">
        <Tbody>
          {(Object.entries(styles) as [keyof Styles, TextBlockStyle][]).map(
            ([key, style]: [keyof Styles, TextBlockStyle]) => (
              <Tr key={key}>
                <Td>
                  <b>{keyMapper[key]}</b>
                </Td>
                <Td>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        variant="ghost"
                        fontWeight="400"
                        leftIcon={<FaCircle color={style.color} />}
                      >
                        <Text width="80px"> {style.color}</Text>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent width="unset">
                      <ChromePicker
                        color={style.color}
                        onChange={(color) => {
                          setStyleAndSaveToStorage({
                            ...styles,
                            [key]: {
                              ...styles[key],
                              color: color.hex,
                            },
                          });
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </Td>
                <Td>
                  <Tooltip label="Coming soon!">
                    <Button
                      variant="ghost"
                      fontWeight="400"
                      isDisabled
                      onClick={() => {
                        setStyleAndSaveToStorage({
                          ...styles,
                          [key]: {
                            ...styles[key],
                            isBold: !styles[key].isBold,
                          },
                        });
                      }}
                    >
                      {style.isBold ? <b>bold</b> : "bold"}
                    </Button>
                  </Tooltip>
                </Td>
                <Td>
                  <Tooltip label="Coming soon!">
                    <Button
                      variant="ghost"
                      fontWeight="400"
                      isDisabled
                      onClick={() => {
                        setStyleAndSaveToStorage({
                          ...styles,
                          [key]: {
                            ...styles[key],
                            isItalic: !styles[key].isItalic,
                          },
                        });
                      }}
                    >
                      {style.isItalic ? <i>Italic</i> : "italic"}
                    </Button>
                  </Tooltip>
                </Td>
                <Td>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setStyleAndSaveToStorage({
                        ...styles,
                        [key]: {
                          color: "#000000",
                          isBold: false,
                          isItalic: false,
                        },
                      });
                    }}
                  >
                    <GrPowerReset />
                  </Button>
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </motion.div>
  );
};
