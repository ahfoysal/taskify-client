"use client";
import Loading from "@/app/loading";
import BoardSectionList from "@/components/tasks/dnd/BoardSectionList";
import { useMeQuery } from "@/redux/api/authApi";
import { useGetTasksQuery } from "@/redux/api/task";
import React, { Suspense, useEffect, useState } from "react";

const TasksPage = () => {
  const { isSuccess, data, isLoading, refetch } = useGetTasksQuery("");
  // const { data, isSuccess, isError, isLoading } = useMeQuery("");

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    
    }
    console.log("d new refreshed");
    
    refetch()
    console.log(data);

  }, [isSuccess, data, refetch]);

  if (  isLoading) return <Loading />;

  return <BoardSectionList data={data} />;
};

export default TasksPage;
