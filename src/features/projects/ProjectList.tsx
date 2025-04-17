import List from "@mui/material/List";
import Item from "./Item";

//import {ContentPaste} from "@mui/icons-material";

interface Project {
  id: string;
  title: string;
}
interface ProjectListProps {
  project: Project[];
}

function ProjectList({ project }: ProjectListProps) {
  return (
    <List>
      {["Cargill", "Novaventa", "M&M", "3M"].map(text => (
        <Item key={text} title={text} icon={"content_paste"} />
      ))}
    </List>
  );
}

export default ProjectList;
