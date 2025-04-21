import List from "@mui/material/List";
import Item from "./ProjectItem";
import Box from "@mui/material/Box";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";

function ProjectItemList() {
  const randomData = [
    { dataId: "1", title: "Features" },
    { dataId: "2", title: "Coming" },
    { dataId: "3", title: "Soon" }
  ];
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box component="button" onClick={handleClick}>
        <List>
          {randomData.map(random => (
            <Item
              key={random.dataId}
              title={random.title}
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
