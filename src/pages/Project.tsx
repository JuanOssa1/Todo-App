import Box from "@mui/material/Box";
import AddButton from "../features/ui/AddButton";
import TaskItemList from "../features/tasks/TaskItemList";
import { useParams } from "react-router-dom";
import TransitionsModal from "../features/ui/Modal";
import { createPortal } from "react-dom";
import { TaskForm } from "../features/tasks/TaskForm";
import { useDispatch } from "react-redux";
import { open } from "../app/slice";

function Project() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  return (
    <>
      {createPortal(
        <TransitionsModal>
          <TaskForm />
        </TransitionsModal>,
        document.body
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          fontSize: "28px"
        }}
      >
        Project: {projectId}
      </Box>
      <TaskItemList />
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
        sx={{
          position: "fixed",
          height: "50px",
          bottom: "0px",
          right: "0px",
          width: { xs: "100%", sm: `calc(100% - ${240}px)` },
          backgroundColor: "red"
        }}
      >
        <AddButton placeHolder="Add Task" onClick={() => dispatch(open())} />
      </Box>
    </>
  );
}

export default Project;
