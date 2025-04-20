import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TaskStatus from "./TaskStatus";
import { TaskPriorityType } from "../../shared/constants";
import { TaskPriority } from "../../shared/constants";
import { Task } from "./types";

const defineIconType = (priority?: TaskPriorityType) => {
  switch (priority) {
    case TaskPriority.High:
      return "priority_high";

    case TaskPriority.Medium:
      return "notification_important";

    case TaskPriority.Low:
      return "low_priority";

    default:
      return "low_priority";
      break;
  }
};
export interface TaskItemProps {
  task: Task;
}

function TaskItem({ task }: TaskItemProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} sx={{ alignItems: "center" }}>
        <Grid size={2}>
          <Icon>{defineIconType(task.taskPriority)}</Icon>
        </Grid>
        <Grid size="grow">
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              maxHeight: "120px",
              overflow: "hidden"
            }}
          >
            {task.taskName}
          </Typography>
        </Grid>
        <Grid size="grow">
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", overflow: "hidden" }}
          >
            {task.taskEndDate?.toString()}
          </Typography>
        </Grid>
        <Grid size="grow">
          <TaskStatus taskStatus={task.taskState!} />
        </Grid>
        <Grid size="grow">
          <IconButton>
            <Icon>{"input"}</Icon>
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TaskItem;
