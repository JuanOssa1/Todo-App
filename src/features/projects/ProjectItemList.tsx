import List from "@mui/material/List";
import Item from "./ProjectItem";

/*
interface Project {
  id: string;
  title: string;
}

Dont remove project item list will using projects in near future
interface ProjectListProps {
  project: Project[];
}*/

function ProjectItemList() {
  return (
    <List>
      {["Test1", "Test 2", "Test 3", "Test 4"].map(text => (
        <Item key={text} title={text} icon={"content_paste"} />
      ))}
    </List>
  );
}

export default ProjectItemList;
