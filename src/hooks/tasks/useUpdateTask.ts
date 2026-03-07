import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { UpdateTaskResponse, UpdateTaskVariables } from "../../features/tasks/types";

const UPDATE_TASK_QUERY = gql`
    mutation updateTask($taskId: String!, $input: UpdateTaskInput!){
        updateTask(id: $taskId, input: $input) {
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
const useUpdateTask = () => {
    const [updateTask, {error, loading, data}] = useMutation<UpdateTaskResponse, UpdateTaskVariables>(UPDATE_TASK_QUERY, {
        fetchPolicy: "no-cache"
    });
    return {updateTask, error, loading, data}
}

export default useUpdateTask;