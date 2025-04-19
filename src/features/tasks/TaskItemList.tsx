import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TaskItem from "./TaskItem";
import Divider from "@mui/material/Divider";

export default function TaskItemList() {
  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        columns={{ xs: 1, sm: 1, md: 1 }}
      >
        {Array.from(Array(6)).map((_, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <TaskItem priority="High" taskState="Pending" />
            <Divider />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
