import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_PROJECT_TASKS_QUERY = gql`
    query tasks($projectId: String!){
        tasksByProject(projectId: $projectId) {
            id
            name
            description
            assignedTo
            priority
            state
            creationDate
            endDate
        }
    }
`
const useGetProjectTasks = (projectId: string) => {
    const {error, loading, data, refetch} = useQuery(GET_PROJECT_TASKS_QUERY, {
        variables: {projectId},
        fetchPolicy: "cache-first"
    })
    return {error, loading, data, refetch}
}

export default useGetProjectTasks;