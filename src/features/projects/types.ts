export interface ProjectFormData {
  projectTitle: string;
  projectDescription?: string;
  projectImageUrl?: string;
}

export interface Project extends ProjectFormData {
  projectId: string;
}

export interface ProjectResponse {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
export interface ProjectInput {
  title: string
  description?: string
  imageUrl?: string
}
export interface CreateProjectResponse {
    createProject: ProjectResponse;
}
export interface UpdateProjectResponse {
    updateProject: ProjectResponse; 
}
export interface GetProjectResponse {
    project: ProjectResponse; 
}
export interface GetProjectsResponse {
    projects: ProjectResponse[]; 
}

export interface CreateProjectVariables {
    input: {
        title: string;
        description?: string;
        imageUrl?: string;
    }
}

export interface UpdateProjectVariables extends CreateProjectVariables {
    projectId: string;
}

