"use client";
import { Button, Divider } from "antd";
import Link from "next/link";
import React from "react";

function NotFoundPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex mb-8">
        <p className="font-bold text-2xl"> 404</p>
        <div className="h-12 mx-6">
          <Divider orientation="center" />
        </div>
        <p>This page could not be found.</p>
      </div>
      <Link href={"/"}>
        <Button size="large">Back To Home</Button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
