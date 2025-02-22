import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import "../assets/css/reports.css";

interface Report {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    divisionId: number;
    passId: number;
    status: string;
}

const reportData: Report[] = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", mobile: "1234567890", divisionId: 101, passId: 5001, status: "Accepted" },
    { id: 2, firstName: "Jane", lastName: "Smith", email: "jane@example.com", mobile: "0987654321", divisionId: 102, passId: 5002, status: "Rejected" },
    { id: 3, firstName: "Alice", lastName: "Johnson", email: "alice@example.com", mobile: "1122334455", divisionId: 103, passId: 5003, status: "Accepted" },
    { id: 4, firstName: "Bob", lastName: "Brown", email: "bob@example.com", mobile: "5566778899", divisionId: 104, passId: 5004, status: "Rejected" },
];

const ReportsPage: React.FC = () => {
    const [hoveredRowKey, setHoveredRowKey] = useState<number | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [filteredData, setFilteredData] = useState<Report[]>(reportData);

    useEffect(() => {
        document.title = "Reports";
    }, []);

    useEffect(() => {
        const filtered = reportData.filter(({ firstName, lastName, email, mobile }) =>
            [firstName, lastName, email, mobile].some(field =>
                field.toLowerCase().includes(searchText.toLowerCase())
            )
        );
        setFilteredData(filtered);
    }, [searchText]);

    const columns: ColumnsType<Report> = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "First Name", dataIndex: "firstName", key: "firstName" },
        { title: "Last Name", dataIndex: "lastName", key: "lastName" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Mobile", dataIndex: "mobile", key: "mobile" },
        { title: "Division ID", dataIndex: "divisionId", key: "divisionId" },
        { title: "Pass ID", dataIndex: "passId", key: "passId" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag className={status === "Accepted" ? "ant-tag-green" : "ant-tag-red"}>{status}</Tag>
            ),
        },
    ];

    return (
        <div className="reports-container">
            <div className="reports-header">
                <Typography.Title level={2}>Reports</Typography.Title>
                <Space>
                    <Input
                        placeholder="Type to Search..."
                        prefix={<SearchOutlined />}
                        className="search-input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Space>
            </div>
            <Table<Report>
                columns={columns}
                dataSource={filteredData.map(report => ({ ...report, key: report.id }))}
                pagination={{ pageSize: 10 }}
                className="reports-table"
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

export default ReportsPage;
