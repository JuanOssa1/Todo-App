import AddButton from "../features/ui/AddButton";
import ProjectCardList from "../features/projects/ProjectCardList";
import TransitionsModal from "../features/ui/Modal";
import Footer from "../features/ui/Footer";
import { ProjectForm } from "../features/projects/ProjectForm";
import { createPortal } from "react-dom";
import { open } from "../app/slice";
import { useDispatch } from "react-redux";
import Header from "../features/ui/Header";
function Home() {
  const dispatch = useDispatch();
  return (
    <>
      {createPortal(
        <TransitionsModal>
          <ProjectForm />
        </TransitionsModal>,
        document.body
      )}
      <Header> Projects</Header>
      <ProjectCardList />
      <Footer>
        <AddButton placeHolder="Test" onClick={() => dispatch(open())} />
      </Footer>
    </>
  );
}

export default Home;
