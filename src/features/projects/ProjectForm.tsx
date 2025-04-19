import * as yup from "yup";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProject, close } from "../../app/slice";
import { Project, ProjectFormData } from "./types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { doc, setDoc } from "firebase/firestore/lite";
import db from "../../db/firestore";

const validationSchema: yup.ObjectSchema<ProjectFormData> = yup.object({
  projectTitle: yup.string().required("Title is required"),
  projectDescription: yup.string(),
  projectImageUrl: yup.string()
});
const textFieldStyle = {
  marginBottom: "13px"
};

export const ProjectForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ProjectFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      projectTitle: "",
      projectDescription: "",
      projectImageUrl: ""
    }
  });
  const onSubmit = async (values: ProjectFormData) => {
    const projectId =
      Date.now().toString(36) + Math.random().toString(36).slice(2);
    const newProject: Project = {
      projectDescription: values.projectDescription,
      projectImageUrl: values.projectImageUrl,
      projectTitle: values.projectTitle,
      projectId
    };
    await setDoc(doc(db, "projects", projectId), newProject);
    dispatch(addProject(newProject));
    dispatch(close());
  };

  const dispatch = useDispatch();

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
            onClick={() => dispatch(close())}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </>
  );
};
