import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_TASK_QUERY = gql`
    createTask($input: CreateTaskInput!){
            createTask(input: $input) {
                id
                name
        }
    }
`
const useCreateTask = (projectId: string, name: string, description: string, assignedTo: string, priority: string, state: string, creationDate: string, endDate: string) => {
    const [createTask, {error, loading, data}] = useMutation(CREATE_TASK_QUERY, {
        variables: {
            input: {
                name,
                description,
                assignedTo,
                priority,
                state,
                creationDate,
                endDate,
                projectId
            }
        }
    });
    return {createTask, error, loading, data}
}

export default useCreateTask;