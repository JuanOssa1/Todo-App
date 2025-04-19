import Box from "@mui/material/Box";
import AddButton from "../features/ui/AddButton";
import TaskItemList from "../features/tasks/TaskItemList";
import { useParams } from "react-router-dom";
import TransitionsModal from "../features/ui/Modal";
import { createPortal } from "react-dom";
import { TaskForm } from "../features/tasks/TaskForm";
import { useDispatch } from "react-redux";
import { open } from "../app/slice";
import Footer from "../features/ui/Footer";

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
      <Footer>
        <AddButton placeHolder="Add Task" onClick={() => dispatch(open())} />
      </Footer>
    </>
  );
}

export default Project;
