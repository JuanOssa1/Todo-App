import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";


const DELETE_TASK_QUERY = gql`
    mutation deleteTask($taskId: String!){
        deleteTask(id: $taskId){
            id
            name
        }
    }
`
const useDeleteTask = (taskId: string) => {
    const [deleteTask, {error, loading, data}] =  useMutation<Boolean>(DELETE_TASK_QUERY,{
        variables: {
            id: taskId
        }
    })
    return {deleteTask, error, loading, data}
}

export default useDeleteTask;