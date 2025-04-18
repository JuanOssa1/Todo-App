import Box from "@mui/system/Box";
import AddButton from "../features/ui/AddButton";
import ProjectCardList from "../features/projects/ProjectCardList";
import TransitionsModal from "../features/ui/Modal";
import { ProjectForm } from "../features/projects/ProjectForm";
import { createPortal } from "react-dom";
function Home() {
  return (
    <>
      {createPortal(
        <TransitionsModal>
          <ProjectForm />
        </TransitionsModal>,
        document.body
      )}
      <Box sx={{ display: "flex", flexDirection: "row", fontSize: "28px" }}>
        Projects
      </Box>
      <ProjectCardList />
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

export default Home;
