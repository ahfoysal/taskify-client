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
import { useLoginMutation } from "@/redux/api/authApi";
import { LoginSchema } from "@/schemas/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { user, loginChecking, googleSignIn, setUser, setLoginChecking } =
    useContext(AuthContext);
  const [spinning, setSpinning] = useState<boolean>(false);

  const [userLogin] = useLoginMutation();
  const Axios = useAxiosSecure();
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.replace("/tasks");
    }

    if (!user) {
      // router.relo();
    }
  }, [user, loginChecking, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    setSpinning(true);

    try {
      const res = await userLogin(data).unwrap();

      if (res.accessToken) {
        toast.success("Successfully logged in");
        storeUserInfo({ accessToken: res.accessToken });
        let user = { ...res.user, token: res.accessToken };

        setUser(user || res.user);
        console.log(user, "user");
        // setLoginChecking(false);
        router.push("/tasks");
        setSpinning(false);

        // window.location.reload();
        // setTimeout(function () {
        //   // Code to be executed after 2 seconds

        //   console.log("Two seconds have passed!");
        // }, 2000);
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
          resolver={yupResolver(LoginSchema)}
        >
          <h1 className="text-4xl font-bold mb-4">Login to create tasks</h1>
          <p className="mb-10">
            Don&apos;t have an account?{" "}
            <Link href="/register">
              <span className="text-[#D34936]">Sign up</span>
            </Link>
          </p>
          <div>
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
            Login
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

export default LoginPage;
