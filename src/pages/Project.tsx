import AddButton from "../features/ui/AddButton";
import TaskItemList from "../features/tasks/TaskItemList";
import { useParams } from "react-router-dom";
import TransitionsModal from "../features/ui/Modal";
import { createPortal } from "react-dom";
import { TaskForm } from "../features/tasks/TaskForm";
import { useDispatch } from "react-redux";
import { open } from "../app/slice";
import Footer from "../features/ui/Footer";
import Header from "../features/ui/Header";

function Project() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  return (
    <>
      {createPortal(
        <TransitionsModal>
          <TaskForm />
        </TransitionsModal>,
        document.body
      )}
      <Header>Project: {projectId}</Header>
      <TaskItemList />
      <Footer>
        <AddButton placeHolder="Add Task" onClick={() => dispatch(open())} />
      </Footer>
    </>
  );
}

export default Project;
