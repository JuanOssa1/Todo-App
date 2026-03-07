import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const UPDATE_PROJECT_QUERY = gql`
    mutation updateProject($projectId: String!, $input: UpdateProjectInput!){
        updateProject(id: $projectId, input: $input) {
            id
            title
        }
    }
`
const useUpdateProject = () => {
    const [updateProject, {error, data, loading}] = useMutation(UPDATE_PROJECT_QUERY, {
        fetchPolicy: "no-cache"
    });
    return {updateProject, error, data, loading}
}

export default useUpdateProject;

