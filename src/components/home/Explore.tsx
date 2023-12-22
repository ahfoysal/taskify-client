"use client";
import React from "react";
import type { CollapseProps } from "antd";
import { Card, Col, Collapse, Row } from "antd";
import Image from "next/image";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items = [
  {
    key: "1",
    label: "Features",
    src: "/f.png",
  },
  {
    key: "2",
    label: "Template gallery",
    src: "/f2.png",
  },
  {
    key: "3",
    label: "Team",
    src: "/f3.png",
  },
  {
    key: "4",
    label: "Extension gallery",
    src: "/f4.png",
  },
];

const Explore: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className="mt-20 flex justify-center items-center flex-col">
      <div className="text-center flex-col gap-10">
        <p className="text-xl font-medium">Why You&apos;ll Use Our App</p>
        <h1 className="text-3xl font-bold mt-6">
          Explore all Taskify has to offer
        </h1>
      </div>
      <div className="mt-10 max-w-4xl mx-auto w-full gap-4">
        <Row
          justify={"start"}
          gutter={[8, 16]}
          style={{ marginBottom: "20px" }}
        >
          {items.map((item, index) => (
            <Col data-aos="flip-left" key={index} sm={12} md={8} lg={6}>
              <Card
                style={{ width: "100%" }}
                cover={
                  <div className="p-2">
                    <Image
                      src={item.src}
                      className="h-[127px] w-full flex justify-center items-center"
                      height={600}
                      width={600}
                      alt="card"
                    />
                  </div>
                }
                headStyle={{
                  fontSize: "14px",
                  whiteSpace: "pre-wrap",
                  margin: "10px 0",
                }}
              >
                <h1 className="text-center text-lg font-bold">{item.label}</h1>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Explore;
