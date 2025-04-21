import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { TaskPriorityType, TaskState } from "../../shared/constants";
import { TaskStatusType } from "../../shared/constants";
import { Controller, useForm } from "react-hook-form";
import { TaskPriority } from "../../shared/constants";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { filterDbTask, setFilters } from "./taskSlice";
import { AppDispatch } from "../../app/store";

interface TaskFilterForm {
  taskPriority?: TaskPriorityType | "All";
  taskState?: TaskStatusType | "All";
}
interface TaskFilterProps {
  onClick?: MouseEventHandler;
}
function TaskFilter({ onClick }: TaskFilterProps) {
  const { projectId } = useParams();
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TaskFilterForm>({
    defaultValues: {
      taskPriority: undefined,
      taskState: undefined
    }
  });
  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = (values: TaskFilterForm) => {
    const { taskPriority, taskState } = values;
    dispatch(filterDbTask({ taskPriority, taskState, projectId }));
    dispatch(setFilters({ taskPriority, taskState }));
    console.log(values);
  };

  const filterStyles = {
    margin: "8px"
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      flexDirection="column"
    >
      <Controller
        name="taskPriority"
        control={control}
        defaultValue="All"
        render={({ field }) => (
          <FormControl sx={filterStyles}>
            <InputLabel>Priority</InputLabel>
            <Select
              {...field}
              id="taskPriority"
              name="taskPriority"
              label="Priority"
              error={!!errors.taskPriority}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value={TaskPriority.High}>High</MenuItem>
              <MenuItem value={TaskPriority.Medium}>Medium</MenuItem>
              <MenuItem value={TaskPriority.Low}>Low</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Controller
        name="taskState"
        control={control}
        defaultValue="All"
        render={({ field }) => (
          <FormControl sx={filterStyles}>
            <InputLabel>Status</InputLabel>
            <Select
              {...field}
              id="taskState"
              name="taskState"
              label="Status"
              error={!!errors.taskState}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="All">
                <em>All</em>
              </MenuItem>
              <MenuItem value={TaskState.Complete}>Complete</MenuItem>
              <MenuItem value={TaskState.Pending}>Pending</MenuItem>
            </Select>
          </FormControl>
        )}
      />
      <Button
        variant="contained"
        onClick={onClick}
        sx={filterStyles}
        type="submit"
      >
        Filter
      </Button>
    </Box>
  );
}

export default TaskFilter;
