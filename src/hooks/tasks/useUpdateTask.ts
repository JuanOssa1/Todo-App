import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const UPDATE_TASK_QUERY = gql`
    updateTask($taskId: String!, $input: UpdateTaskInput!){
        updateTask(id: $taskId, input: $input) {
            id
            name
        }
    }
`
const useUpdateTask = (name: string, description: string, assignedTo: string, priority: string, state: string, endDate: string) => {
    const [createTask, {error, loading, data}] = useMutation(UPDATE_TASK_QUERY, {
        variables: {
            input: {
                name,
                description,
                assignedTo,
                priority,
                state,
                endDate,
            }
        }
    });
    return {createTask, error, loading, data}
}

export default useUpdateTask;