import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
/*
prioties

*/
interface TaskItemProps {
  priority: string;
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
const StateItem: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 128,
          height: 30
        }
      }}
    >
      <Paper elevation={1} />
    </Box>
  );
};
function TaskItem({ priority }: TaskItemProps) {
  return (
    <Box sx={{ /* maxWidth: "100%", position: "relative" */ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid size="grow">
          <Icon>{defineIconType(priority)}</Icon>
        </Grid>
        <Grid size={6}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            This is the project name
          </Typography>
        </Grid>
        <Grid size="grow">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            DD/MM/YYY
          </Typography>
        </Grid>
        <Grid size="grow">
          <StateItem />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TaskItem;
