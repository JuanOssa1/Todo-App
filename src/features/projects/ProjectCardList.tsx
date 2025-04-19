import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProjectCard from "./ProjectCard";
import { selectProjectList } from "../../app/slice";
import { useAppSelector } from "../../app/hooks";

export default function ProjectCardList() {
  const projects = useAppSelector(selectProjectList);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {projects.map(project => (
          <Grid key={project.projectId} size={{ xs: 2, sm: 4, md: 4 }}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
