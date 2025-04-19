import Box from "@mui/material/Box";

import { FooterProps } from "./types";

export default function Footer({ children }: FooterProps) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"end"}
      sx={{
        position: "fixed",
        minHeight: "50px",
        bottom: "0px",
        right: "0px",
        width: { xs: "100%", sm: `calc(100% - ${240}px)` },
        backgroundColor: "red"
      }}
    >
      {children}
    </Box>
  );
}
