import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { TaskResponse } from "../../features/tasks/types";

const GET_TASK_QUERY = gql`
    query task($taskId: String!){
        task(id: $taskId) {
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
const useGetTask = (taskId: string) => {
    const {error, loading, data, refetch} = useQuery<TaskResponse>(GET_TASK_QUERY, {
        variables: {taskId},
        fetchPolicy: "cache-first"
    })
    return {error, loading, data, refetch}
}

export default useGetTask;

