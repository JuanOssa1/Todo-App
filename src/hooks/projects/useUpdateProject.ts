import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { UpdateProjectResponse, UpdateProjectVariables } from "../../features/projects/types";

const UPDATE_PROJECT_QUERY = gql`
    mutation updateProject($projectId: String!, $input: UpdateProjectInput!){
        updateProject(id: $projectId, input: $input) {
            id
            title
            description
            imageUrl
        }
    }
`
const useUpdateProject = () => {
    const [updateProject, {error, data, loading}] = useMutation<UpdateProjectResponse, UpdateProjectVariables>(UPDATE_PROJECT_QUERY, {
        fetchPolicy: "no-cache"
    });
    return {updateProject, error, data, loading}
}

export default useUpdateProject;

