import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_TASK_QUERY = gql`
    mutation createTask($input: CreateTaskInput!){
            createTask(input: $input) {
                id
                name
        }
    }
`
const useCreateTask = () => {
    const [createTask, { error, loading, data }] = useMutation(
        CREATE_TASK_QUERY,
        { fetchPolicy: "no-cache" }
    )
    return { createTask, error, loading, data }
}

export default useCreateTask;