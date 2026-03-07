import { Project, ProjectResponse, ProjectFormData, ProjectInput } from "./types";

export const mapProjectResponseToProject = (response: ProjectResponse): Project => ({
  projectId: response.id,
  projectTitle: response.title,
  projectDescription: response.description,
  projectImageUrl: response.imageUrl ?? ""
});

export const mapProjectFormDataToProjectInput = (formData: ProjectFormData): ProjectInput => ({
  title: formData.projectTitle,
  description: formData.projectDescription,
  imageUrl: formData.projectImageUrl,
});

export const mapProjectsResponseToProjects = (responses: ProjectResponse[]): Project[] =>
  responses.map(mapProjectResponseToProject);