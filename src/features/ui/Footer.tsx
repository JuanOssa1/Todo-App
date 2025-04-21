import Box from "@mui/material/Box";

import { FooterProps } from "./types";
import { useTheme } from "@mui/material";

export default function Footer({ children }: FooterProps) {
  const theme = useTheme();
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
        backgroundColor: theme.palette.secondary.main
      }}
    >
      {children}
    </Box>
  );
}
