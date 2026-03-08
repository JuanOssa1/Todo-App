import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { GetProjectTasksResponse } from "../../features/tasks/types";
import { useAppSelector } from "../../app/hooks";
import { selectFilters, selectOrder } from "../../features/tasks/taskSlice";

const GET_PROJECT_TASKS_QUERY = gql`
    query tasks($projectId: String!, $orderByCreationDate: String, $filterByPriority: TaskPriority, $filterByState: TaskState){
        tasksByProject(
                projectId: $projectId, 
                filterByPriority: $filterByPriority, 
                filterByState: $filterByState, 
                orderByCreationDate: $orderByCreationDate
            ) {
                id
                name
                description
                assignedTo
                priority
                state
                creationDate
                endDate
                projectId
            }
    }
`
const useGetProjectTasks = (projectId: string) => {
    const { taskPriority: filterByPriority, taskState: filterByState } = useAppSelector(selectFilters);
    const orderByCreationDate = useAppSelector(selectOrder);

    const {error, loading, data, refetch} = useQuery<GetProjectTasksResponse>(GET_PROJECT_TASKS_QUERY, {
        variables: { 
            projectId, 
            orderByCreationDate, 
            filterByPriority: filterByPriority === "All" ? undefined : filterByPriority, 
            filterByState: filterByState === "All" ? undefined : filterByState
        },
        fetchPolicy: "network-only"
    })
    return {error, loading, data, refetch}
}

export default useGetProjectTasks;