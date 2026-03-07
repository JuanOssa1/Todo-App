import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { CreateTaskResponse, CreateTaskVariables } from "../../features/tasks/types";

const CREATE_TASK_QUERY = gql`
    mutation createTask($input: CreateTaskInput!){
            createTask(input: $input) {
                id
                name
                assignedTo,
                priority,
                state
        }
    }
`
const useCreateTask = () => {
    const [createTask, { error, loading, data }] = useMutation<CreateTaskResponse, CreateTaskVariables>(
        CREATE_TASK_QUERY,
        { fetchPolicy: "no-cache" }
    )
    return { createTask, error, loading, data }
}

export default useCreateTask;