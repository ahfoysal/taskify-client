"use client";
import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";
import SortableTaskItem from "./SortableTaskItem";
import { Card, Col, Row } from "antd";
import { Task } from "./types";
import { findTitleByKey } from "./constance";

type TaskSectionProps = {
  id: string;
  title: string;
  tasks: Task[];
};

const TaskSection = ({ id, title, tasks }: TaskSectionProps) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <Card title={findTitleByKey(title)}>
      <SortableContext
        id={id}
        items={tasks}
        strategy={verticalListSortingStrategy}
      >
        <Row
          ref={setNodeRef}
          justify={"start"}
          gutter={[8, 16]}
          style={{ marginBottom: "20px" }}
        >
          {tasks?.map((task) => (
            <Col span={24} key={task.id}>
              <SortableTaskItem id={task.id}>
                <TaskItem task={task} />
              </SortableTaskItem>
            </Col>
          ))}
        </Row>
      </SortableContext>
    </Card>
  );
};

export default TaskSection;
