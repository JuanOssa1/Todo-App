import Box from "@mui/material/Box";
import React from "react";
import { HeaderProps } from "./types";

function Header({ children }: HeaderProps) {
  return (
    <Box
      sx={{
        flexGrow: 1
      }}
    >
      {children}
    </Box>
  );
}

export default Header;
