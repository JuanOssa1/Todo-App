import List from "@mui/material/List";
import Item from "./ProjectItem";
import { useAppSelector } from "../../app/hooks";
import { selectProjectList } from "./projectSlice";
import Box from "@mui/material/Box";
import { Snackbar, SnackbarCloseReason } from "@mui/material";
import { useState } from "react";

function ProjectItemList() {
  const projects = useAppSelector(selectProjectList);

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Box component="button" onClick={handleClick}>
        <List>
          {projects.map(project => (
            <Item
              key={project.projectId}
              title={project.projectTitle}
              icon={"content_paste"}
            />
          ))}
        </List>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message=" Soon you will be able to navigate between projects through this
            window and search for projects. Stay tuned!"
        key={"bottom" + "left"}
      />
    </>
  );
}

export default ProjectItemList;
