"use client";
import Loading from "@/app/loading";
import TasksContainer from "@/components/tasks/dnd/TasksContainer";
import { useGetTasksQuery } from "@/redux/api/task";
import { Button } from "antd";
import Link from "next/link";

const TasksPage = () => {
  const { isSuccess, data, isLoading, refetch } = useGetTasksQuery("");

 

  if (  isLoading) return <Loading />;

  return(
    <div>
   <div className="w-full flex justify-end items-center my-5"> <Link href={'/tasks/create'}> <Button size="large"> Create Task</Button></Link></div>
    <TasksContainer data={data} />
  </div>
  );
};

export default TasksPage;
