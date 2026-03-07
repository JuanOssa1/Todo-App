import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_PROJECTS_QUERY = gql`
    query {
        projects {
            id
            title
            description
            createdAt
        }
    }
`
const useGetProjects = () => {
    const {error, loading, data, refetch} = useQuery(GET_PROJECTS_QUERY,{
        fetchPolicy: "cache-first"
    });
    return {error, loading, data, refetch};
}

export default useGetProjects;