import { createPortal } from "react-dom";
import { TaskForm } from "../features/tasks/TaskForm";
import TransitionsModal from "../features/ui/Modal";
import Box from "@mui/material/Box";
import Footer from "../features/ui/Footer";
import Header from "../features/ui/Header";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { open } from "../app/slice";
import TaskStatus from "../features/tasks/TaskStatus";
import { TaskState } from "../shared/constants";

function Task() {
  const dispatch = useDispatch();
  return (
    <>
      {createPortal(
        <TransitionsModal>
          <TaskForm />
        </TransitionsModal>,
        document.body
      )}
      <Header>
        <Box
          display="flex"
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Typography variant="h5" sx={{ color: "text.secondary" }}>
            Hey is a task
          </Typography>
          <TaskStatus taskStatus={TaskState.Complete} />
        </Box>
      </Header>
      <Box
        sx={{
          display: "flex",
          fontSize: "28px"
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica Lizards are a
        </Typography>
      </Box>
      <Footer>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3}>
            <Grid size="grow" paddingLeft={"7px"}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Assigned To:
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Start Date:
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                End Date:
              </Typography>
            </Grid>
            <Grid size="grow">
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Juan
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                21/04/2025
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                21/04/2025
              </Typography>
            </Grid>
            <Grid
              size="grow"
              container
              direction="row"
              gap={"0px"}
              sx={{ alignItems: "end", justifyContent: "end" }}
            >
              <IconButton onClick={() => dispatch(open())}>
                <Icon>{"edit"}</Icon>
              </IconButton>
              <IconButton>
                <Icon>{"delete"}</Icon>
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Footer>
    </>
  );
}

export default Task;
