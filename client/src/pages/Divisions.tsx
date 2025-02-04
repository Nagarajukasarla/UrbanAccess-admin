import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import "../assets/css/divisions.css";
import { divisions } from "../data/components";
import { Division } from "../types/model";

const Divisions: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
const [hoveredRowKey, setHoveredRowKey] = React.useState<number | null>(
        null
    );

    // Show the modal
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Handle form submission
    const handleFormSubmit = (values: Division) => {
        console.log("Division Added:", values);
        message.success("Division added successfully");
        setIsModalVisible(false);
    };

    // Handle form cancel
    const handleCancel = () => {
        console.log("Form cancelled");
        message.info("Form cancelled");
        setIsModalVisible(false);
    };

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
<Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                Add Division
            </Button>
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


            {/* Division Form Modal */}
            <Modal
                title="Add New Division"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null} // Custom footer with buttons
            >
                <CreateDivision
                    onSubmit={handleFormSubmit}
                />
                <div style={{ textAlign: "right", marginTop: 16 }}>
                    <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                        Cancel
                    </Button>
                    <Button type="primary" onClick={() => document.getElementById("division-form-submit")?.click()}>
                        Add
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default Divisions;
