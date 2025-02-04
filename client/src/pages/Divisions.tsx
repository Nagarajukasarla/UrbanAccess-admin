import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import "../assets/css/divisions.css";
import { divisions } from "../data/components";
import { Division } from "../types/model";

const Divisions: React.FC = () => {
    const [hoveredRowKey, setHoveredRowKey] = React.useState<number | null>(
        null
    );

    const columns: ColumnsType<Division> = [
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
            title: "Number of Colleges",
            dataIndex: "numberOfCollege",
            key: "numberOfCollege",
            render: (count) => count ?? "-",
        },
        {
            title: "Number of Schools",
            dataIndex: "numberOfSchools",
            key: "numberOfSchools",
            render: (count) => count ?? "-",
        },
    ];

    return (
        <div className="divisions-container">
            <div className="divisions-header">
                <h2>Divisions</h2>
                <Space>
                    <Input
                        placeholder="Type to Search"
                        prefix={<SearchOutlined />}
                        className="search-input"
                    />
                </Space>
            </div>
            <Table<Division>
                columns={columns}
                dataSource={divisions.map((division) => ({
                    ...division,
                    key: division.id,
                }))}
                pagination={{ pageSize: 10 }}
                className="divisions-table"
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

export default Divisions;
