import AddButton from "../features/ui/AddButton";
import ProjectCardList from "../features/projects/ProjectCardList";
import TransitionsModal from "../features/ui/Modal";
import Footer from "../features/ui/Footer";
import { ProjectForm } from "../features/projects/ProjectForm";
import { createPortal } from "react-dom";
import { open } from "../app/slice";

import { useDispatch } from "react-redux";
import Header from "../features/ui/Header";
import PageTitle from "../features/ui/PageTitle";
import { collection, query, getDocs } from "firebase/firestore/lite";
import db from "../db/firestore";
import { useEffect } from "react";
import { parseProject } from "../features/projects/parser";
import { addProject, markAsLoaded } from "../app/slice";
import { selectIsLoaded } from "../app/slice";
import { useAppSelector } from "../app/hooks";

function Home() {
  const dispatch = useDispatch();
  const projectsLoaded = useAppSelector(selectIsLoaded);
  useEffect(() => {
    const getProjectsQuery = query(collection(db, "projects"));
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(getProjectsQuery);
      querySnapshot.forEach(doc => {
        const project = parseProject(doc);
        dispatch(addProject(project));
      });
    };
    dispatch(markAsLoaded());
    if (projectsLoaded) {
      fetchProjects();
    }
  }, [dispatch, projectsLoaded]);

  return (
    <>
      {createPortal(
        <TransitionsModal>
          <ProjectForm />
        </TransitionsModal>,
        document.body
      )}
      <Header>
        <PageTitle goBack={false} title="Projects" />
      </Header>
      <ProjectCardList />
      <Footer>
        <AddButton placeHolder="Test" onClick={() => dispatch(open())} />
      </Footer>
    </>
  );
}

export default Home;
