import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { MouseEventHandler } from "react";

export interface FilterProps {
  ariaDescribeBy?: string | undefined;
  onClick?: MouseEventHandler;
}

function Filter({ ariaDescribeBy, onClick }: FilterProps) {
  return (
    <IconButton aria-describedby={ariaDescribeBy} onClick={onClick}>
      <Icon>{"filter_alt"}</Icon>
    </IconButton>
  );
}

export default Filter;
