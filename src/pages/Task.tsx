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
import { isEditing } from "../features/tasks/taskSlice";
import { open } from "../features/ui/modalSlice";
import TaskStatus from "../features/tasks/TaskStatus";
import PageTitle from "../features/ui/PageTitle";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getTask } from "../features/tasks/taskSlice";
import { AppDispatch } from "../app/store";
import { selectActiveTsk } from "../features/tasks/taskSlice";
import { useAppSelector } from "../app/hooks";
import { removeDbTask } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";

function Task() {
  const dispatch = useDispatch<AppDispatch>();
  const task = useAppSelector(selectActiveTsk);
  const navigate = useNavigate();
  const { taskId } = useParams();
  useEffect(() => {
    dispatch(getTask(taskId!));
  }, [dispatch, taskId]);

  const goPreviousPage = () => {
    navigate(-1);
  };

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
          <PageTitle title={task?.taskName} goPreviousPage={goPreviousPage} />
          <TaskStatus taskStatus={task?.taskState} />
        </Box>
      </Header>
      <Box
        sx={{
          display: "flex",
          fontSize: "28px"
        }}
      >
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {task?.taskDescription}
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
                {task?.taskAssignedTo}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {task?.taskCreationDate?.toString()}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {task?.taskEndDate?.toString()}
              </Typography>
            </Grid>
            <Grid
              size="grow"
              container
              direction="row"
              gap={"0px"}
              sx={{ alignItems: "end", justifyContent: "end" }}
            >
              <IconButton
                onClick={() => {
                  dispatch(open());
                  dispatch(isEditing(true));
                }}
              >
                <Icon>{"edit"}</Icon>
              </IconButton>
              <IconButton
                onClick={() => {
                  dispatch(removeDbTask(taskId!));
                  goPreviousPage();
                }}
              >
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
