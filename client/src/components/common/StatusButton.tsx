import React from "react";
import { Button } from "antd";

type StatusButtonProps = {
  status: string;
};

const StatusButton: React.FC<StatusButtonProps> = ({ status }) => {
  let buttonProps = {};
  if (status === "Pending") buttonProps = { type: "default", style: { backgroundColor: "orange", color: "white" } };
  if (status === "Approved") buttonProps = { type: "primary", style: { backgroundColor: "green", color: "white" } };
  if (status === "Rejected") buttonProps = { type: "primary", style: { backgroundColor: "red", color: "white" } };

  return <Button {...buttonProps}>{status}</Button>;
};

export default StatusButton;
