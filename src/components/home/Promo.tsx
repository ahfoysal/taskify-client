"use client";
import { Avatar, Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";

const testimonials = [
  {
    title:
      "Taskify has revolutionized my productivity at Tech Innovators. I get more done in less time!",
    avatarSrc: "/user1.webp",
    author: "David Johnson",
    position: "Founder, Tech Innovators",
  },
  {
    title:
      "I can't imagine managing my tasks at ABC Inc. without Taskify. It's a game-changer!",
    avatarSrc: "/user2.webp",
    author: "Sarah Johnson",
    position: "Project Manager, Success INC",
  },
  {
    title:
      "Taskify is my go-to task manager at Tech Innovators. It keeps me organized and on track every day.",
    avatarSrc: "/user3.webp",
    author: "Emily Smith",
    position: "CEO-Founder, Tech Innovators",
  },
  {
    title:
      "I love the simplicity and power of Taskify at Global Solutions. It's perfect for both work and personal tasks.",
    avatarSrc: "/user4.webp",
    author: "Jenny Parker",
    position: "Designer, Creative Designs",
  },
  {
    title:
      "Taskify's user-friendly interface at Creative Designs makes task management a breeze. Highly recommended!",
    avatarSrc: "/user5.webp",
    author: "Mark Thompson    ",
    position: "CEO, Global Solutions    ",
  },
  {
    title:
      "Taskify's features are top-notch at Achieve Success Inc. It's the best tool for keeping my team on target.",
    avatarSrc: "/user6.webp",
    author: "John Deo",
    position: "Founder, Carter's Boutique",
  },
];

const Promo = () => {
  return (
    <div
    
      className="flex justify-center items-center flex-col"
    >
      <div className="text-center flex-col gap-10">
        <p className="text-xl font-medium">Our Users</p>
        <h1 className="text-3xl font-bold mt-6">What people are saying</h1>
      </div>
      <div className="mt-10 max-w-4xl mx-auto w-full gap-4">
        <Row
          justify={"start"}
          gutter={[8, 16]}
          style={{ marginBottom: "20px" }}
        >
          {testimonials.map((testimonial, index) => (
            <Col key={index} sm={24} md={12} lg={12}>
              <Card
                data-aos="zoom-in-up"
                style={{ width: "100%" }}
                title={testimonial.title}
                headStyle={{
                  fontSize: "14px",
                  whiteSpace: "pre-wrap",
                  margin: "10px 0",
                }}
              >
                <Meta
                  avatar={<Avatar src={testimonial.avatarSrc} />}
                  title={testimonial.author}
                  description={testimonial.position}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Promo;
