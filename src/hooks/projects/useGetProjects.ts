import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { GetProjectsResponse } from "../../features/projects/types";

const GET_PROJECTS_QUERY = gql`
    query {
        projects {
            id
            title
            imageUrl
            description
            createdAt
        }
    }
`
const useGetProjects = () => {
    const {error, loading, data, refetch} = useQuery<GetProjectsResponse>(GET_PROJECTS_QUERY,{
        fetchPolicy: "cache-first"
    });
    return {error, loading, data, refetch};
}

export default useGetProjects;