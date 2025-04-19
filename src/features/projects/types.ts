export interface ProjectFormData {
  projectTitle: string;
  projectDescription?: string;
  projectImageUrl?: string;
}

export interface Project extends ProjectFormData {
  projectId: string;
}
