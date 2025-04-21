import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Icon from "@mui/material/Icon";
import { MouseEventHandler } from "react";

interface ItemProps {
  id?: string;
  title: string;
  icon: string;
  onClick?: MouseEventHandler;
}

function ProjectItem({ id, title, icon, onClick }: ItemProps) {
  return (
    <ListItem key={id} disablePadding>
      <ListItemButton onClick={onClick}>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}

export default ProjectItem;
