import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TaskStatus from "./TaskStatus";
import { TaskItemProps } from "./types";
import { TaskPriorityType } from "../../shared/constants";
import { TaskPriority } from "../../shared/constants";

const defineIconType = (priority: TaskPriorityType) => {
  switch (priority) {
    case TaskPriority.High:
      return "priority_high";

    case TaskPriority.Medium:
      return "notification_important";

    case TaskPriority.Low:
      return "low_priority";

    default:
      break;
  }
};

function TaskItem({ priority, taskState }: TaskItemProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} sx={{ alignItems: "center" }}>
        <Grid size={2}>
          <Icon>{defineIconType(priority)}</Icon>
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
            This is the project name This is the project name This is the
            project name This is the project name
          </Typography>
        </Grid>
        <Grid size="grow">
          <Typography
            variant="body2"
            sx={{ color: "text.secondary", overflow: "hidden" }}
          >
            DD/MM/YYY
          </Typography>
        </Grid>
        <Grid size="grow">
          <TaskStatus taskStatus={taskState} />
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
