import AddButton from "../features/ui/AddButton";
import TaskItemList from "../features/tasks/TaskItemList";
import TransitionsModal from "../features/ui/Modal";
import { createPortal } from "react-dom";
import { TaskForm } from "../features/tasks/TaskForm";
import { useDispatch } from "react-redux";
import { open } from "../app/slice";
import Footer from "../features/ui/Footer";
import Header from "../features/ui/Header";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import Filter from "../features/ui/Filter";
import Sort from "../features/ui/Sort";
import { MouseEvent, useState } from "react";
import PageTitle from "../features/ui/PageTitle";
import TaskFilter from "../features/tasks/TaskFilter";

function Project() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopOver = Boolean(anchorEl);
  const id = openPopOver ? "simple-popover" : undefined;
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
          <PageTitle title="Hey is a Project" />
          <Box>
            <Filter aria-describedby={id} onClick={handleClick} />
            <Sort />
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
