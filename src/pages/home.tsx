import AddButton from "../features/ui/AddButton";
import ProjectCardList from "../features/projects/ProjectCardList";
import TransitionsModal from "../features/ui/Modal";
import Footer from "../features/ui/Footer";
import { ProjectForm } from "../features/projects/ProjectForm";
import { createPortal } from "react-dom";
import { open } from "../features/ui/modalSlice";
import { useDispatch } from "react-redux";
import Header from "../features/ui/Header";
import PageTitle from "../features/ui/PageTitle";
import { useEffect } from "react";
import {setProjects } from "../features/projects/projectSlice";
import { mapProjectsResponseToProjects } from "../features/projects/projectMappers";
import useGetProjects from "../hooks/projects/useGetProjects";
import { useAppSelector } from "../app/hooks";
import { AppDispatch } from "../app/store";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Home() {
  const dispatch = useDispatch<AppDispatch>();
  //const isLoadingProjects = useAppSelector(selectLoadingProject);
  const { loading, data } = useGetProjects();

  useEffect(() => {
    if (data) {
      const projects = mapProjectsResponseToProjects(data.projects);
      dispatch(setProjects(projects));
    }
  }, [data, dispatch]);

  return (
    <>
      {createPortal(
        <TransitionsModal>
          <ProjectForm />
        </TransitionsModal>,
        document.body
      )}
      <Backdrop
        sx={theme => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Header>
        <PageTitle goBack={false} title="Projects" />
      </Header>
      <ProjectCardList />
      <Footer>
        <AddButton placeHolder="Add Project" onClick={() => dispatch(open())} />
      </Footer>
    </>
  );
}

export default Home;
