import React, { useEffect } from "react";
import { Table, Button, Input } from "antd";
import StatusButton from "../common/StatusButton";
import { Application } from "../../types/model";

const { Search } = Input;

type RequestTableProps = {
  data: Application[];
};

const RequestTable: React.FC<RequestTableProps> = ({ data = [] }) => {
  useEffect(() => {
    console.log("RequestTable data:", data);
  }, [data]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Mobile", dataIndex: "mobile", key: "mobile" },
    { title: "Division ID", dataIndex: "divisionId", key: "divisionId" },
    { title: "Pass ID", dataIndex: "passId", key: "passId" },
    { title: "Status", dataIndex: "status", key: "status", render: (status: string) => <StatusButton status={status} /> },
    { title: "Updated By", dataIndex: "updatedBy", key: "updatedBy" },
  ];
  console.log("RequestTable data:", JSON.stringify(data, null, 2));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <Search placeholder="Search" style={{ width: 200 }} />
        <Button type="primary" danger>Reset Filter</Button>
      </div>
      <Table columns={columns} dataSource={data ? data.filter(Boolean) : []} rowKey="id" />
    </div>
  );
};

export default RequestTable;