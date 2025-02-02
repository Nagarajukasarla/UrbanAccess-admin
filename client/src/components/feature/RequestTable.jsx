import React from "react";
import { Table, Button, Input } from "antd";
import StatusButton from "../common/StatusButton"; // Import from common

const { Search } = Input;

const RequestTable = ({ data }) => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Pass Type", dataIndex: "passType", key: "passType" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "Status", dataIndex: "status", key: "status", render: (status) => <StatusButton status={status} /> },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Search placeholder="Search" style={{ width: 200 }} />
        <Button type="primary" danger>Reset Filter</Button>
      </div>
      <Table columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
};

export default RequestTable;
