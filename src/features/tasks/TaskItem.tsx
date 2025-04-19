import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";

interface TaskItemProps {
  priority: string;
  taskState: string;
}
interface StateItemProps {
  taskState: string;
}
const defineIconType = (priority: string) => {
  switch (priority) {
    case "High":
      return "priority_high";

    case "Medium":
      return "notification_important";

    case "Low":
      return "low_priority";

    default:
      break;
  }
};
const StateItem: React.FC<StateItemProps> = ({ taskState }: StateItemProps) => {
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
          {taskState}
        </Typography>
      </Paper>
    </Box>
  );
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
          <StateItem taskState={taskState} />
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
