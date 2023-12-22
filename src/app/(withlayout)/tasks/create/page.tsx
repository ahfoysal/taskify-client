"use client";
import { Button, Col, Row, Spin, message } from "antd";
import loginImage from "@/asstets/login.svg";
import Image from "next/image";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { storeUserInfo } from "@/services/auth.service";
import toast from "react-hot-toast";
import FormSelect from "@/components/forms/FormSelect";
import FormTextArea from "@/components/forms/FormTextArea";
import FormDatePicker from "@/components/forms/FormDatePicker";
import type { RangePickerProps } from "antd/es/date-picker";
import customParseFormat from "dayjs/plugin/customParseFormat";

import dayjs from "dayjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { TaskSchema } from "@/schemas/task";
import { useState } from "react";
import { useCreateTaskMutation } from "@/redux/api/task";
import { useRouter } from "next/navigation";
import { priorityOptions } from "@/utils/SelectOptions";
dayjs.extend(customParseFormat);

const disabledDate: RangePickerProps["disabledDate"] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().startOf("day");
};
const CreateTaskPage = () => {
  const router = useRouter();

  const [spinning, setSpinning] = useState<boolean>(false);
  const [createTask] = useCreateTaskMutation();

  const onSubmit: SubmitHandler<any> = async (data: any) => {
    setSpinning(true);

    try {
      const res = await createTask(data).unwrap();
      console.log(res);
      message.success("Successfully Created Task");

      setSpinning(false);

      router.push("/tasks");
    } catch (err) {
      console.log(err);

      setSpinning(false);
    }
  };

  return (
    <Row justify={"start"} align={"middle"}>
      <Spin spinning={spinning} fullscreen />

      <Form
        submitHandler={onSubmit as SubmitHandler<any>}
        resolver={yupResolver(TaskSchema)}
      >
        <Row
          justify={"start"}
          gutter={[8, 16]}
          style={{ marginBottom: "20px" }}
        >
          <Col span={24}>
            <div>
              <FormInput
                label="Title"
                placeholder="Please Enter Your Task Name"
                type="text"
                name="title"
                size="large"
              />
            </div>
          </Col>
          <Col sm={12} md={8} lg={8}>
            <div>
              <FormSelect
                label="Priority"
                defaultValue="normal"
                options={priorityOptions}
                name="priority"
                size="large"
              />
            </div>
          </Col>
          <Col sm={12} md={8} lg={8}>
            <div>
              <FormDatePicker
                label="Starst At"
                name="startsAt"
                placeholder="Starts At"
                size="large"
                disabledDate={disabledDate}
              />
            </div>
          </Col>
          <Col md={8} sm={12} lg={8}>
            <div>
              <FormDatePicker
                label="Ends At"
                name="endsAt"
                placeholder="Ends At"
                size="large"
                disabledDate={disabledDate}
              />
            </div>
          </Col>
          <Col span={24}>
            <div>
              <FormTextArea
                label="Description"
                placeholder="Please Enter Your Task Description"
                name="description"
                size="large"
              />
            </div>
          </Col>
          <Col xs={12} sm={12} md={5} lg={3}>
            <Button
              style={{ width: "100%", background: "blue", color: "white" }}
              size="large"
              htmlType="submit"
            >
              Create
            </Button>
          </Col>
          <Col xs={12} sm={12} md={5} lg={3}>
            <Button style={{ width: "100%" }} size="large" htmlType="submit">
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
    </Row>
  );
};

export default CreateTaskPage;
