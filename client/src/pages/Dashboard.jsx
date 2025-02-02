import React from "react";
import { Typography } from "antd";
import RequestTable from "../components/feature/RequestTable"; // Import from feature

const { Title, Paragraph } = Typography;

const sampleData = [
  { id: "1234", name: "Kristin Watson", passType: "General", email: "michelle.rivera@example.com", gender: "Male", status: "Verify" },
  { id: "4567", name: "Marvin McKinney", passType: "Metro", email: "debbie.baker@example.com", gender: "Female", status: "Accepted" },
  { id: "1234", name: "Kristin Watson", passType: "General", email: "michelle.rivera@example.com", gender: "Male", status: "Rejected" },
  { id: "4567", name: "Marvin McKinney", passType: "Metro", email: "debbie.baker@example.com", gender: "Female", status: "Verify" },
];

const Dashboard = () => {
  return (
    <div style={{ padding: 20 }}>
      <Title level={2} style={{ color: "#1890ff" }}>Order List</Title>
      <Paragraph>Hello Admin, Let's start the work</Paragraph>
      <RequestTable data={sampleData} />
    </div>
  );
};

export default Dashboard;
