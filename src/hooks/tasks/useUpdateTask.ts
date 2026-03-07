import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const UPDATE_TASK_QUERY = gql`
    mutation updateTask($taskId: String!, $input: UpdateTaskInput!){
        updateTask(id: $taskId, input: $input) {
            id
            name
        }
    }
`
const useUpdateTask = () => {
    const [createTask, {error, loading, data}] = useMutation(UPDATE_TASK_QUERY, {
        fetchPolicy: "no-cache"
    });
    return {createTask, error, loading, data}
}

export default useUpdateTask;