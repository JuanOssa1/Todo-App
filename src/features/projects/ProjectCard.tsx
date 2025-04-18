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

export default function ProjectCard() {
  const dispatch = useDispatch();

  const cardRef = useRef(null);

  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      <IconButton
        onClick={() => dispatch(open())}
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
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button ref={cardRef} size="small">
          More
        </Button>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
