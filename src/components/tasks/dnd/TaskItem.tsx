import { Badge, Card } from "antd";
import { Task } from "./types";
import { getColorByPriority } from "@/utils/SelectOptions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  useHandleDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/api/task";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import dayjs from "dayjs";
import { useEffect } from "react";

type TaskItemProps = {
  task: Task;
};
dayjs.extend(customParseFormat);

const TaskItem = ({ task }: TaskItemProps) => {
  // console.log(task);
  const [deleteTask, { isSuccess, data }] = useHandleDeleteTaskMutation();
  const priorityColor = getColorByPriority(task.priority);
  const router = useRouter();
  const [updateTask] = useUpdateTaskMutation();
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  useEffect(() => {
    if (isSuccess) {
      console.log("fixex v01");

      if (pathNames[pathNames.length - 1] === "tasks") {
        console.log("task");

        window.location.reload();
      }
      if (pathNames[pathNames.length - 1] === "task") {
        console.log("tasks");

        window.location.reload();
      }
      toast.success("Task deleted successfully");
    }
  }, [data, isSuccess, router, pathNames]);
  return (
    <Badge.Ribbon text={task.priority} color={priorityColor}>
      <Card
        title={task.title}
        actions={[
          <Link
            key={`/tasks/update/${task.id}`}
            href={`/tasks/update/${task.id}`}
          >
            <EditOutlined key="edit" />
          </Link>,
          <DeleteOutlined
            onClick={() => {
              deleteTask(task.id);
              console.log("deleted1");
              toast.loading("Deleting Task")
              updateTask({ id: task.id, data: null });
            }}
            key="setting"
          />,
        ]}
      >
        {task.description}
        <div className="flex justify-end items-center ">
          <p className="text-red-500">
            Deadline : {dayjs(task.endsAt).format("ddd, DD MMM")}
          </p>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default TaskItem;
