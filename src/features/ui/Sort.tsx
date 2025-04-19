import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { MouseEventHandler } from "react";

export interface SortProps {
  ariaDescribeBy?: string | undefined;
  onClick?: MouseEventHandler;
}

function Sort({ ariaDescribeBy, onClick }: SortProps) {
  return (
    <IconButton aria-describedby={ariaDescribeBy} onClick={onClick}>
      <Icon>{"sort"}</Icon>
    </IconButton>
  );
}

export default Sort;
