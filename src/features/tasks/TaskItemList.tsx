import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TaskItem from "./TaskItem";
import Divider from "@mui/material/Divider";
import { selectTaskList } from "./taskSlice";
import { useAppSelector } from "../../app/hooks";

export default function TaskItemList() {
  const tasks = useAppSelector(selectTaskList);

  return (
    <Box>
      <Grid
        container
        spacing={{ xs: 3, md: 3 }}
        columns={{ xs: 1, sm: 1, md: 1 }}
      >
        {tasks.map(task => (
          <Grid key={task.taskId} size={{ xs: 2, sm: 4, md: 4 }}>
            <TaskItem task={task} />
            <Divider />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
