import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import "../assets/css/applications.css";
import { Application } from "../types/model";
import { applications } from "../data/components";

const Applications: React.FC = () => {
    // const [requestData, setRequestData] = useState<Application[]>([]);
    const [hoveredRowKey, setHoveredRowKey] = useState<number | null>(null);

    useEffect(() => {
        document.title = "Applications";
        loadData();
    }, []);

    const columns: ColumnsType<Application> = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Mobile", dataIndex: "mobile", key: "mobile" },
        { title: "Division ID", dataIndex: "divisionId", key: "divisionId" },
        { title: "Pass ID", dataIndex: "passId", key: "passId" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "blue";
                switch (status) {
                    case "Approved":
                        color = "green";
                        break;
                    case "Rejected":
                        color = "red";
                        break;
                    case "Pending":
                        color = "orange";
                        break;
                }
                return (
                    <Tag
                        color={color}
                        style={{ fontWeight: "bold", padding: "5px 12px" }}
                    >
                        {status}
                    </Tag>
                );
            },
        },
        { title: "Updated By", dataIndex: "updatedBy", key: "updatedBy" },
    ];

    const loadData = () => {
        // setRequestData(data);
    };

    return (
        <div className="applications-container">
            <div className="applications-header">
                <h2>Applications</h2>
                <Space>
                    <Input
                        placeholder="Type to Search"
                        prefix={<SearchOutlined />}
                        className="search-input"
                    />
                </Space>
            </div>
            <Table<Application>
                columns={columns}
                dataSource={applications.map((app) => ({
                    ...app,
                    key: app.id,
                }))}
                pagination={{ pageSize: 10 }}
                className="applications-table"
                onRow={(record) => ({
                    onMouseEnter: () => setHoveredRowKey(record.id),
                    onMouseLeave: () => setHoveredRowKey(null),
                })}
                rowClassName={(record) =>
                    record.id === hoveredRowKey ? "hovered-row" : ""
                }
            />
        </div>
    );
};

export default Applications;
