import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const DELETE_PROJECT_QUERY = gql`
    mutation deleteProject(projectId: String!){\
        deleteProject(id: $projectId){
            id
            title
        }
    }
`
const useDeleteProject = (projectId: string) => {
    const [deleteProject, {error, data, loading}] = useMutation(DELETE_PROJECT_QUERY,{
        variables: {
            id: projectId
        }
    });
    return {deleteProject, error, data, loading};
}

export default useDeleteProject;