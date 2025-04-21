import Box from "@mui/material/Box";
import { HeaderProps } from "./types";
import { drawerWidth } from "../../shared/constants";

function Header({ children }: HeaderProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: { sm: `calc(95vw - ${drawerWidth}px)` }
      }}
    >
      {children}
    </Box>
  );
}

export default Header;
