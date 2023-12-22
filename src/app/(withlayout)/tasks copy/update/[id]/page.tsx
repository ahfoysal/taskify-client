import UpdateTaskForm from "@/components/tasks/TaskUpdateForm";

const UpdateTask = ({ params }: { params: { id: string } }) => {
 
  return <UpdateTaskForm   taskId={params.id}/>;
};

export default UpdateTask;
