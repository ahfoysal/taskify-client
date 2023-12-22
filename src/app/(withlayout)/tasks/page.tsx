"use client";
import Loading from "@/app/loading";
import TasksContainer from "@/components/tasks/dnd/TasksContainer";
import { useGetTasksQuery } from "@/redux/api/task";

const TasksPage = () => {
  const { isSuccess, data, isLoading, refetch } = useGetTasksQuery("");

 

  if (  isLoading) return <Loading />;

  return <TasksContainer data={data} />;
};

export default TasksPage;
