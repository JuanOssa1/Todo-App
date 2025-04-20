import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { open } from "../../app/slice";
import { useRef } from "react";
import { Project } from "./types";
import { selectProject } from "../../app/slice";
import { removeProject } from "../../app/slice";
import { removeDbProject } from "../../app/slice";
import { AppDispatch } from "../../app/store";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const cardRef = useRef(null);

  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      <IconButton
        onClick={() => {
          dispatch(open());
          dispatch(selectProject(project.projectId));
        }}
        sx={{ position: "absolute", top: "8px", right: "16px", margin: 0 }}
      >
        <Icon>{"edit"}</Icon>
      </IconButton>
      <CardMedia
        ref={cardRef}
        component="img"
        alt="green iguana"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {project.projectTitle}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {project.projectDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button ref={cardRef} size="small">
          <Link to={`project/${project.projectId}`}>More</Link>
        </Button>
        <Button
          onClick={() => {
            dispatch(removeDbProject(project.projectId));
            dispatch(removeProject(project.projectId));
          }}
          size="small"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
