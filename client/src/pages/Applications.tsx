import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/applications.css";
import { applications } from "../data/components";
import { Application } from "../types/model";

const Applications: React.FC = () => {
    // const [requestData, setRequestData] = useState<Application[]>([]);
    const [hoveredRowKey, setHoveredRowKey] = useState<number | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Applications";
        loadData();
    }, []);

    const columns: ColumnsType<Application> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            render: (_: string, record: Application) => (
                <Typography.Text>{record.id}</Typography.Text>
            ),
        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
            render: (_: string, record: Application) => (
                <Typography.Text>
                    {record.personalInfo?.firstName}
                </Typography.Text>
            ),
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            render: (_: string, record: Application) => (
                <Typography.Text>
                    {record.personalInfo?.lastName}
                </Typography.Text>
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (_: string, record: Application) => (
                <Typography.Text>{record.personalInfo?.email}</Typography.Text>
            ),
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
            render: (_: string, record: Application) => (
                <Typography.Text>{record.mobile}</Typography.Text>
            ),
        },
        {
            title: "Division ID",
            dataIndex: "divisionId",
            key: "divisionId",
            render: (_: number, record: Application) => (
                <Typography.Text>{record.divisionId}</Typography.Text>
            ),
        },
        {
            title: "Pass ID",
            dataIndex: "passId",
            key: "passId",
            render: (_: number, record: Application) => (
                <Typography.Text>{record.passId}</Typography.Text>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_: string, record: Application) => (
                <Button
                    type="primary"
                    onClick={() => navigate(`/app/applications/${record.id}`)}
                >
                    Verify
                </Button>
            ),
        },
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
            />{" "}
        </div>
    );
};

export default Applications;
