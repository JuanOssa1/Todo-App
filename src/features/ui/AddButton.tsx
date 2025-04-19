import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { MouseEventHandler } from "react";

interface AddButtonProps {
  placeHolder: string;
  onClick: MouseEventHandler;
}
function AddButton({ placeHolder, onClick }: AddButtonProps) {
  return (
    <Stack
      spacing={2}
      direction="row"
      marginRight={"26px"}
      height={"30px"}
      display={"flex"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <Button variant="contained" onClick={onClick}>
        {placeHolder}
      </Button>
    </Stack>
  );
}

export default AddButton;
