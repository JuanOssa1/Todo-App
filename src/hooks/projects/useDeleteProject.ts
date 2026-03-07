import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { DeleteProjectVariables } from "../../features/projects/types";

const DELETE_PROJECT_QUERY = gql`
    mutation deleteProject($projectId: String!){
        deleteProject(id: $projectId)
    }
`
const useDeleteProject = () => {
    const [deleteProject, {error, data, loading}] = useMutation<Boolean, DeleteProjectVariables>(DELETE_PROJECT_QUERY,{
        fetchPolicy: "no-cache"
    });
    return {deleteProject, error, data, loading};
}

export default useDeleteProject;