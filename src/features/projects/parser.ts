import { DocumentData } from "firebase/firestore/lite";
import { Project } from "./types";

export const parseProject = (doc: DocumentData) => {
  const project: Project = {
    projectId: doc.data().projectId,
    projectTitle: doc.data().projectTitle,
    projectDescription: doc.data().projectDescription,
    projectImageUrl: doc.data().projectImageUrl
  };
  return project;
};
