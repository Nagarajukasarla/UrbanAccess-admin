import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { Institute } from "../../types/model";
import "../../assets/css/institutes.css";
import { institutes } from "../../data/components";

const Institutes: React.FC = () => {
    const [hoveredRowKey, setHoveredRowKey] = React.useState<number | null>(
        null
    );
    const columns: ColumnsType<Institute> = [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Division ID",
            dataIndex: "divisionId",
            key: "divisionId",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Type",
            key: "type",
            render: (_, record) => (
                <Tag
                    color={record.isSchool ? "green" : "blue"}
                    style={{ fontWeight: "bold", padding: "5px 12px" }}
                >
                    {record.isSchool ? "🏫 School" : "🎓 College"}
                </Tag>
            ),
        },
        {
            title: "Status",
            key: "status",
            render: () => <Tag color="success">Active</Tag>,
        },
    ];

    return (
        <div className="institutes-container">
            <div className="institutes-header">
                <h2>Institutions</h2>
                <Space>
                    <Input
                        placeholder="Type to Search"
                        prefix={<SearchOutlined />}
                        className="search-input"
                    />
                </Space>
            </div>
            <Table<Institute>
                columns={columns}
                dataSource={institutes.map((institute) => ({
                    ...institute,
                    key: institute.id,
                }))}
                pagination={{ pageSize: 10 }}
                className="institutes-table"
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

export default Institutes;
