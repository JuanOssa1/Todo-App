import Box from "@mui/material/Box";
import AddButton from "../features/ui/AddButton";
import TaskItemList from "../features/tasks/TaskItemList";
import { useParams } from "react-router-dom";

function Project() {
  const { projectId } = useParams();
  return (
    <>
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
        <AddButton placeHolder="Test" />
      </Box>
    </>
  );
}

export default Project;
