import { createPortal } from "react-dom";
import { TaskForm } from "../features/tasks/TaskForm";
import TransitionsModal from "../features/ui/Modal";
import Box from "@mui/material/Box";

function Task() {
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
        This is a task
      </Box>
    </>
  );
}

export default Task;
