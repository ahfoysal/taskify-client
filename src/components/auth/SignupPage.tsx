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
      const res = await signUp(data).unwrap();
      console.log(res);

      if (!!res.accessToken) {
        toast.success("Successfully Created Account");
        setUser(res?.user);
        setSpinning(false);

        storeUserInfo({ accessToken: res.accessToken });
        router.push("/tasks");
        window.location.reload();
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
      toast.success("Successfully logged in");
      router.push("/tasks");
      setSpinning(false);

      setUser(response?.data?.data?.user);

      storeUserInfo({ accessToken: response?.data?.data?.accessToken });

      console.log(response?.data);
    } else {
      setSpinning(false);
    }

    return response;
  };
  return (
    <Row
      justify={"center"}
      align={"middle"}
      style={{
        minHeight: "100vh",
      }}
    >
      <Spin spinning={spinning} fullscreen />

      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} alt="login-image" width={500} />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <Form
          submitHandler={onSubmit as SubmitHandler<any>}
          resolver={yupResolver(SignUpSchema)}
        >
          <h1 className="text-4xl font-bold mb-4">Create an account</h1>
          <p className="mb-10">
            Already have an account?
            <Link href="/login">
              <span className="text-[#8321FF]">Sign In</span>
            </Link>
          </p>
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
              backgroundColor: "#8624FF",
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
