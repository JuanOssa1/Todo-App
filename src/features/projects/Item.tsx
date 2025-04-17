import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Icon from "@mui/material/Icon";

interface ItemProps {
  key?: string;
  title: string;
  icon: string;
}

function Item({ key, title, icon }: ItemProps) {
  return (
    <ListItem key={key} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}

export default Item;
