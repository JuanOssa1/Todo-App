import * as yup from "yup";
import { useFormik } from "formik";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { close } from "../../app/slice";

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string(),
  imageUrl: yup.string()
});
const textFieldStyle = {
  marginBottom: "8px"
};

export const ProjectForm = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      imageUrl: ""
    },
    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  const dispatch = useDispatch();

  return (
    <>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          sx={textFieldStyle}
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
          sx={textFieldStyle}
        />
        <TextField
          fullWidth
          id="imageUrl"
          name="imageUrl"
          label="Image Url"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.imageUrl && Boolean(formik.errors.imageUrl)}
          helperText={formik.touched.imageUrl && formik.errors.imageUrl}
          sx={textFieldStyle}
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
