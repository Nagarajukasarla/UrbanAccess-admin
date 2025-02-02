import React from "react";
import { Button } from "antd";

type StatusButtonProps = {
  status: string;
};

const getStatusColor = (status: string): "green" | "red" | "gray" => {
  switch (status.toLowerCase()) {
    case "approved":
      return "green";
    case "rejected":
      return "red";
    default:
      return "gray";
  }
};

const StatusButton: React.FC<StatusButtonProps> = ({ status }) => {
  return (
    <Button style={{ backgroundColor: getStatusColor(status), color: "white" }}>
      {status}
    </Button>
  );
};

export default StatusButton;
