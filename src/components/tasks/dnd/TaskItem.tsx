import { Badge, Card } from "antd";
import { Task } from "./types";
import { getColorByPriority } from "@/utils/SelectOptions";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useHandleDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/redux/api/task";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

type TaskItemProps = {
  task: Task;
};
dayjs.extend(customParseFormat);

const TaskItem = ({ task }: TaskItemProps) => {
  // console.log(task);
  const [deleteTask] = useHandleDeleteTaskMutation();
  const priorityColor = getColorByPriority(task.priority);
  const router = useRouter();
  const [updateTask] = useUpdateTaskMutation();

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

              window.location.reload();

              updateTask({ id: task.id, data: null });
              // router.push('/tasks')
              toast.success("Task deleted successfully");
            }}
            key="setting"
          />,
        ]}
      >
        {task.description}
        <div className="flex justify-end items-center "> 
          <p className="text-red-900">
            Deadline : {dayjs(task.endsAt).format("ddd, DD MMM")}
          </p>
        </div>
      </Card>
    </Badge.Ribbon>
  );
};

export default TaskItem;