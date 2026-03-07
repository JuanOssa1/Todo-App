import * as yup from "yup";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";

import { close } from "../ui/modalSlice";
import {
  addProject,
  editProject,
  selectSelectedProject,
  selectProject,
} from "./projectSlice";

import { Project, ProjectFormData, ProjectInput } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import useCreateProject from "../../hooks/projects/useCreateProject";
import useUpdateProject from "../../hooks/projects/useUpdateProject";
import {
  mapProjectFormDataToProjectInput,
  mapProjectResponseToProject,
} from "./projectMappers";

const validationSchema: yup.ObjectSchema<ProjectFormData> = yup.object({
  projectTitle: yup.string().required("Title is required"),
  projectDescription: yup.string(),
  projectImageUrl: yup.string(),
});
const textFieldStyle = {
  marginBottom: "13px",
};

export const ProjectForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { createProject } = useCreateProject();
  const { updateProject } = useUpdateProject();
  const currentProject = useAppSelector(selectSelectedProject);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      projectTitle: currentProject?.projectTitle ?? "",
      projectDescription: currentProject?.projectDescription ?? "",
      projectImageUrl: currentProject?.projectImageUrl ?? "",
    },
  });
  
  const onSubmit = async (values: ProjectFormData) => {
    const projectInput = mapProjectFormDataToProjectInput(values);
    if (currentProject) {
      updateProjectHelper(currentProject, projectInput);
    } else {
      createProjectHelper(projectInput);
    }
    dispatch(close());
    dispatch(selectProject(undefined));
  };

  const updateProjectHelper = async (
    currentProject: Project,
    projectInput: ProjectInput,
  ) => {
    const result = await updateProject({
      variables: {
        projectId: currentProject.projectId,
        input: projectInput,
      },
    });
    if (result.data) {
      const updatedProject = mapProjectResponseToProject(
        result.data.updateProject,
      );
      dispatch(editProject(updatedProject));
    }
  };
  const createProjectHelper = async (projectInput: ProjectInput) => {
    const result = await createProject({
      variables: {
        input: projectInput,
      },
    });
    if (result.data) {
      const newProject = mapProjectResponseToProject(result.data.createProject);
      dispatch(addProject(newProject));
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="projectTitle"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="projectTitle"
              name="projectTitle"
              label="Title*"
              error={!!errors.projectTitle}
              helperText={errors.projectTitle?.message}
              sx={textFieldStyle}
            />
          )}
        />
        <Controller
          name="projectDescription"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="projectDescription"
              name="projectDescription"
              label="Description"
              error={!!errors.projectDescription}
              helperText={errors.projectDescription?.message}
              sx={textFieldStyle}
            />
          )}
        />
        <Controller
          name="projectImageUrl"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              fullWidth
              id="projectImageUrl"
              name="projectImageUrl"
              label="Image Url"
              error={!!errors.projectImageUrl}
              helperText={errors.projectImageUrl?.message}
              sx={textFieldStyle}
            />
          )}
        />

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
          <Button
            color="primary"
            variant="contained"
            sx={{ marginLeft: "7px" }}
            onClick={() => {
              dispatch(close());
              dispatch(selectProject(undefined));
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};
