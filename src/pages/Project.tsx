import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import {
  selectIsLoadingTask,
  sortTasks,
  sortDbTask
} from "../features/tasks/taskSlice";
import { open } from "../features/ui/modalSlice";
import { AppDispatch } from "../app/store";
import AddButton from "../features/ui/AddButton";
import Filter from "../features/ui/Filter";
import Footer from "../features/ui/Footer";
import Header from "../features/ui/Header";
import TransitionsModal from "../features/ui/Modal";
import PageTitle from "../features/ui/PageTitle";
import Sort from "../features/ui/Sort";
import { TaskForm } from "../features/tasks/TaskForm";
import TaskItemList from "../features/tasks/TaskItemList";
import TaskFilter from "../features/tasks/TaskFilter";

import Backdrop from "@mui/material/Backdrop";
import { getDbTasks } from "../features/tasks/taskSlice";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { CircularProgress } from "@mui/material";

function Project() {
  const { projectId } = useParams();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isLoadingTask = useAppSelector(selectIsLoadingTask);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openPopOver = Boolean(anchorEl);
  const id = openPopOver ? "simple-popover" : undefined;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const goPreviousPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(getDbTasks(projectId!));
  }, [dispatch, projectId]);

  return (
    <>
      {createPortal(
        <TransitionsModal>
          <TaskForm />
        </TransitionsModal>,
        document.body
      )}

      <Backdrop
        sx={theme => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoadingTask}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Header>
        <Box
          display="flex"
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <PageTitle title="Project Tasks" goPreviousPage={goPreviousPage} />
          <Box>
            <Filter aria-describedby={id} onClick={handleClick} />
            <Sort
              onClick={() => {
                dispatch(sortTasks());
                dispatch(sortDbTask(projectId!));
              }}
            />
          </Box>
          <Popover
            id={id}
            open={openPopOver}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
          >
            <TaskFilter />
          </Popover>
        </Box>
      </Header>
      <TaskItemList />
      <Footer>
        <AddButton placeHolder="Add Task" onClick={() => dispatch(open())} />
      </Footer>
    </>
  );
}

export default Project;
