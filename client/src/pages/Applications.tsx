import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/applications.css";
import { getPendingApplicationsFromLocalStorage } from "../services/local-storage/localStorageService";
import { Application } from "../types/model";

const Applications: React.FC = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
    const [filteredData, setFilteredData] = useState<Application[]>([]);
    const [hoveredRowKey, setHoveredRowKey] = useState<number | null>(null);
    const [searchText, setSearchText] = useState("");

    const loadData = () => {
        const pendingApplications = getPendingApplicationsFromLocalStorage();
        setApplications(pendingApplications);
        setFilteredData(pendingApplications);
    };

    useEffect(() => {
        document.title = "Applications";
        loadData();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchText, applications]);

    const filterData = () => {
        let result = applications;

        // Search across multiple fields
        if (searchText) {
            const searchLower = searchText.toLowerCase();
            result = result.filter(
                (app) =>
                    app.personalInfo?.firstName
                        ?.toLowerCase()
                        .includes(searchLower) ||
                    app.personalInfo?.lastName
                        ?.toLowerCase()
                        .includes(searchLower) ||
                    app.personalInfo?.email
                        ?.toLowerCase()
                        .includes(searchLower) ||
                    app.mobile?.toLowerCase().includes(searchLower) ||
                    app.id.toString().includes(searchLower)
            );
        }

        setFilteredData(result);
    };

    const columns: ColumnsType<Application> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            sorter: (a: Application, b: Application) => a.id - b.id,
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

    return (
        <div className="applications-container">
            <div className="applications-header">
                <Typography.Title level={2}>Applications</Typography.Title>
                <Space>
                    <Input
                        placeholder="Search applications"
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        style={{ width: 250 }}
                    />
                </Space>
            </div>
            <Table<Application>
                columns={columns}
                dataSource={filteredData.map((app) => ({
                    ...app,
                    key: app.id,
                }))}
                pagination={{
                    pageSize: 10,
                    total: filteredData.length,
                    showTotal: (total, range) =>
                        `${range[0]}-${range[1]} of ${total} applications`,
                }}
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
