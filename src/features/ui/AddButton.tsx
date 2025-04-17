import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

interface AddButtonProps {
  placeHolder: string;
}
function AddButton({ placeHolder }: AddButtonProps) {
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
      <Button variant="contained">{placeHolder}</Button>
    </Stack>
  );
}

export default AddButton;
