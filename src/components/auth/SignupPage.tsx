"use client";
import { Button, Col, Divider, Row, Spin } from "antd";
import loginImage from "@/asstets/login.svg";
import Image from "next/image";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { GoogleOutlined } from "@ant-design/icons";
import { storeUserInfo } from "@/services/auth.service";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/hooks/AuthContextProvider";
import { UserCredential } from "firebase/auth";
import useAxiosSecure from "@/hooks/useAxios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useLoginMutation, useSignUpMutation } from "@/redux/api/authApi";
import { LoginSchema, SignUpSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import UploadImage from "../forms/UploadImage";

type FormValues = {
  email: string;
  password: string;
};

const SignUpPage = () => {
  const { user, loginChecking, googleSignIn, setUser } =
    useContext(AuthContext);
  const [spinning, setSpinning] = useState<boolean>(false);

  const [signUp] = useSignUpMutation();
  const Axios = useAxiosSecure();
  const router = useRouter();
  useEffect(() => {
    if (!loginChecking && user) {
      router.replace("/tasks");
    }
    if (!user) {
      // router.relo();
    }
  }, [user, loginChecking, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    setSpinning(true);

    try {
      console.log(data);
      const res = await signUp(data).unwrap();
      console.log(res);

      if (!!res.accessToken) {
        toast.success("Successfully Created Account");
        storeUserInfo({ accessToken: res.accessToken });
        setUser(res?.user);

        setSpinning(false);
        router.push("/tasks");
      }
    } catch (err: any) {
      console.log(err);
      toast.error(err.data || "Something went wrong");
      setSpinning(false);
    }
  };
  const providerSignIn = async (payload: UserCredential) => {
    setSpinning(true);

    const token = await payload.user.getIdToken();
    console.log(token);

    const response = await Axios.post(
      "/auth/provider",
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
    if (response?.data?.data?.accessToken) {
      // toast.success("Successfully logged in");
      // router.push("/tasks");
      // setSpinning(false);

      // setUser(response?.data?.data?.user);

      // storeUserInfo({ accessToken: response?.data?.data?.accessToken });

      console.log(response?.data?.data, "data");
    } else {
      setSpinning(false);
    }

    return response;
  };
  return (
    <Row
      justify={"center"}
      className="login-reverse py-20 md:py-0"
      align={"middle"}
      style={{
        minHeight: "100vh",
      }}
    >
      <Spin spinning={spinning} fullscreen />

      <Col data-aos="fade-up-right" sm={12} md={16} lg={10}>
        <Image src={loginImage} alt="login-image" width={500} />
      </Col>
      <Col data-aos="fade-up-left" sm={12} md={8} lg={8}>
        <Form
          submitHandler={onSubmit as SubmitHandler<any>}
          resolver={yupResolver(SignUpSchema)}
        >
          <h1 className="text-4xl font-bold mb-4">Create an account</h1>
          <p className="mb-10">
            Already have an account?
            <Link href="/login">
              <span className="text-[#D34936]">Sign In</span>
            </Link>
          </p>

          <div className=" w-full flex justify-center items-center">
            <UploadImage name="avatar" />
          </div>
          <div>
            <FormInput
              label="Name"
              placeholder="Please Enter Your Name"
              type="text"
              name="name"
              size="large"
            />
          </div>
          <div
            style={{
              margin: "16px 0",
            }}
          >
            <FormInput
              label="Email"
              placeholder="Please Enter Your Email"
              type="text"
              name="email"
              size="large"
            />
          </div>
          <div
            style={{
              margin: "16px 0",
            }}
          >
            <FormInput
              label="Password"
              placeholder="Please Enter Your Password"
              type="password"
              name="password"
              size="large"
            />
          </div>
          <Button
            style={{
              width: "100%",
              backgroundColor: "#D34936",
              color: "white",
            }}
            size="large"
            type="default"
            htmlType="submit"
          >
            Sign Up
          </Button>
          <Divider>Or</Divider>
          <Button
            onClick={() => {
              googleSignIn()
                .then((result) => {
                  // setUser(result.user);

                  console.log(result);
                  if (result?.user) {
                    providerSignIn(result);
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            style={{ width: "100%", background: "#24242A", color: "white" }}
            size="large"
            icon={<GoogleOutlined />}
          >
            Continue With Google
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUpPage;
