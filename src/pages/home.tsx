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

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getProjectsQuery = query(collection(db, "projects"));
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(getProjectsQuery);
      querySnapshot.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
      });
    };
    fetchProjects();
  }, []);

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
