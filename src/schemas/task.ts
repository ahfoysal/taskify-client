import * as yup from "yup";

export const TaskSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  priority: yup.string().required("Priority is required"),
  startsAt: yup.string().required("Starts at is required"),
  endsAt: yup.string().required("Ends at is required"),
});
