import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_PROJECT_QUERY = gql`
    mutation createProject($input: CreateProjectInput!){
        createProject(input: $input) {
            id
            title
            description
            createdAt
            updatedAt
        }
    }
`
const useCreateProject = () => {
    const [createProject, {error, data, loading}] = useMutation(CREATE_PROJECT_QUERY, {
        fetchPolicy: "no-cache"
    })
    return {createProject, error, data, loading};
}

export default useCreateProject;

