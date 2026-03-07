import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_PROJECT_QUERY = gql`
    query project($projectId: String!) {
        project(id: $projectId) {
            id
            title
            tasks {
                id
                name
                priority
                state
            }
        }
    }
`
const useGetProject = (id : string) => {
    const {error, loading, data, refetch} = useQuery(GET_PROJECT_QUERY,{
        variables: {projectId: id},
        fetchPolicy: "cache-first"
    });
    return {error, loading, data, refetch};
}

export default useGetProject;
