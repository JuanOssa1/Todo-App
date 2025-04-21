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
        spacing={{ xs: 3, sm: 3, md: 12 }}
        columns={{ xs: 1, sm: 1, md: 12 }}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          height: "100%"
        }}
      >
        {projects.map(project => (
          <Grid key={project.projectId} size={{ xs: 2, sm: 2, md: 4 }}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
