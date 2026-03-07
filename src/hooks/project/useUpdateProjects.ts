import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const UPDATE_PROJECT_QUERY = gql`
    mutation updateProject($projectId: String!, $name: String, $description: String, $imagUrl: String){
        updateProject(id: $projectId, title: $name, description: $description, imageUrl: $imagUrl) {
            id
            title
            description
            createdAt
            updatedAt
        }
    }
`
const useUpdateProject = (projectId: string, name?: string, description?: string, imageUrl?: string) => {
    const [updateProject, {error, data, loading}] = useMutation(UPDATE_PROJECT_QUERY, {
        variables:{
            id: projectId,
            title: name,
            description,
            imageUrl
        },
        fetchPolicy: "no-cache"
    });
    return {updateProject, error, data, loading}
}

export default useUpdateProject;

