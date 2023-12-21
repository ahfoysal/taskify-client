"use client";
import React, { useEffect, useState } from "react";
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import TaskItem from "./TaskItem";
import { findBoardSectionContainer, initializeBoard } from "./utils/board";
import { BoardSections as BoardSectionsType } from "./types";
import { getTaskById } from "./utils/tasks";
import { Card, Col, Grid, Row, Spin } from "antd";
import BoardSection from "./BoardSection";
import { useGetTasksQuery, useUpdateTaskMutation } from "@/redux/api/task";
import toast from "react-hot-toast";

const BoardSectionList = ({ data }: { data: any }) => {
  const tasks = data;

  const initialBoardSections = initializeBoard(data);
  const [boardSections, setBoardSections] =
    useState<BoardSectionsType>(initialBoardSections);

  const [activeTaskId, setActiveTaskId] = useState<null | string>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
        // delay: 200
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(
        (item) => item.id === active.id
      );
      const overIndex = overItems.findIndex(
        (item: any) => item.id !== over?.id
      );

      return {
        ...boardSection,
        [activeContainer]: [
          ...boardSection[activeContainer].filter(
            (item: any) => item.id !== active.id
          ),
        ],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(
            overIndex,
            boardSection[overContainer].length
          ),
        ],
      };
    });
  };
  const [updateTask, { isSuccess, isError }] = useUpdateTaskMutation();
  const [spinning, setSpinning] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task Updated");
      setSpinning(false);
    }
    if (isError) {
      setSpinning(false);
    }
  }, [isSuccess, isError]);
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    setSpinning(true);
    const activeContainer = findBoardSectionContainer(
      boardSections,
      active.id as string
    );
    const overContainer = findBoardSectionContainer(
      boardSections,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex(
      (task) => task.id === active.id
    );
    const overIndex = boardSections[overContainer].findIndex(
      (task) => task.id === over?.id
    );

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(
          boardSection[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }

    setActiveTaskId(null);
    // const from = Object.keys(boardSections);

    // console.log(from, overContainer);
    // if(boardSections  )
    updateTask({ id: active.id, data: { status: overContainer } });
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const task = activeTaskId ? getTaskById(tasks, activeTaskId) : null;

  return (
    <div className="container mx-auto">
      <Spin spinning={spinning} fullscreen />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Row
          justify={"start"}
          gutter={[8, 16]}
          style={{ marginBottom: "20px" }}
        >
          {Object.keys(boardSections).map((boardSectionKey) => {
            return (
              <Col span={12} key={boardSectionKey}>
                <BoardSection
                  id={boardSectionKey}
                  title={boardSectionKey}
                  tasks={boardSections[boardSectionKey]}
                />
              </Col>
            );
          })}
        </Row>
        <DragOverlay dropAnimation={dropAnimation}>
          {task ? <TaskItem task={task} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default BoardSectionList;
