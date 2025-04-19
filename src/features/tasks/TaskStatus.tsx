import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { StatusItemProps } from "./types";

function TaskStatus({ taskStatus }: StatusItemProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",

        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 30,
          minWidth: 75
        }
      }}
    >
      <Paper
        elevation={1}
        sx={{ justifyItems: "center", alignContent: "center" }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {taskStatus}
        </Typography>
      </Paper>
    </Box>
  );
}

export default TaskStatus;
