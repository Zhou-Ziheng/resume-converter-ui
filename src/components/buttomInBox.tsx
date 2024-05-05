import { Button, ButtonProps, forwardRef } from "@chakra-ui/react";
import { ClassAttributes } from "react";

export const ButtonInBox = forwardRef(({ children, ...props }, ref) => {
  return (
    <Button
      {...props}
      ref={ref}
      _hover={{
        background: "brand.primaryTransparent",
      }}
      _active={{
        bg: "brand.primary",
      }}
    >
      {children}
    </Button>
  );
});
