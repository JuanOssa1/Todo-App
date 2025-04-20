import { MouseEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import {
  setTasks,
  open,
  markTasksAsLoaded,
  selectTaskIsLoaded,
  sortTasks,
  sortDbTask
} from "../app/slice";
import { AppDispatch } from "../app/store";
import db from "../db/firestore";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
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
import { parseTask } from "../features/tasks/parser";
import { Task } from "../features/tasks/types";

import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";

function Project() {
  const { projectId } = useParams();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const taskLoaded = useAppSelector(selectTaskIsLoaded);

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
    const tasks: Task[] = [];
    const getProjectsQuery = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId)
    );
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(getProjectsQuery);
      querySnapshot.forEach(doc => {
        const task = parseTask(doc);
        tasks.push(task);
      });
      dispatch(setTasks(tasks));
    };
    dispatch(markTasksAsLoaded());
    if (taskLoaded) {
      fetchTasks();
    }
  }, [dispatch, projectId, taskLoaded]);

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
          <PageTitle title="Hey is a Project" goPreviousPage={goPreviousPage} />
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
