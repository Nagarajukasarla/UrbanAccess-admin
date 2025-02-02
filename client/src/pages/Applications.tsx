import React, { useEffect, useState } from "react";
import { Button, Space, Typography, Row, Col } from "antd";
import RequestTable from "../components/feature/RequestTable";
import { Application } from "../types/model";

const { Title, Text } = Typography;

export const Applications: React.FC = () => {
    const [requestData, setRequestData] = useState<Application[]>([]);

    useEffect(() => {
        document.title = "Applications";
        loadData();
    }, []);

    const loadData = () => {
        const data: Application[] = [
            {
                id: 1234,
                name: "Kristin Watson",
                email: "michelle.rivera@example.com",
                mobile: "123-456-7890",
                divisionId: 1,
                passId: 101,
                status: "Pending",
                updatedBy: 3,
            },
            {
                id: 4567,
                name: "Marvin McKinney",
                email: "debbie.baker@example.com",
                mobile: "987-654-3210",
                divisionId: 2,
                passId: 102,
                status: "Approved",
                updatedBy: 5,
            },
            {
                id: 7890,
                name: "Cameron Williamson",
                email: "cameron.w@example.com",
                mobile: "456-789-1230",
                divisionId: 3,
                passId: 103,
                status: "Rejected",
                updatedBy: 2,
            },
            {
                id: 2345,
                name: "Guy Hawkins",
                email: "guy.hawkins@example.com",
                mobile: "321-654-9870",
                divisionId: 4,
                passId: 104,
                status: "Pending",
                updatedBy: 4,
            },
            {
                id: 6789,
                name: "Esther Howard",
                email: "esther.h@example.com",
                mobile: "789-123-4560",
                divisionId: 5,
                passId: 105,
                status: "Pending",
                updatedBy: 1,
            },
            {
                id: 3456,
                name: "Brooklyn Simmons",
                email: "brooklyn.s@example.com",
                mobile: "159-753-4862",
                divisionId: 6,
                passId: 106,
                status: "Rejected",
                updatedBy: 6,
            },
        ];
        setRequestData(data);
    };

    return (
        <Space
            direction="vertical"
            style={{
                width: "100%",
                padding: "20px",
                backgroundColor: "#f0f2f5",
            }}
        >
            <Space direction="vertical" size="small">
                <Title level={2} style={{ color: "#1890ff" }}>
                    Applications
                </Title>
                <Text type="secondary">Hello Admin, Let's start the work</Text>
            </Space>
            <Row justify="space-between" align="middle">
                <Col>
                    <Space>
                        <Button
                            style={{ borderColor: "#1890ff", color: "#1890ff" }}
                        >
                            Add filter
                        </Button>
                        <Button
                            style={{ borderColor: "#1890ff", color: "#1890ff" }}
                        >
                            Date
                        </Button>
                        <Button
                            style={{ borderColor: "#1890ff", color: "#1890ff" }}
                        >
                            Sort by
                        </Button>
                    </Space>
                </Col>
                {/* <Col>
                    <Space>
                        <Search placeholder="Search" style={{ width: 200 }} />
                        <Button type="primary" danger>Reset Filter</Button>
                    </Space>
                </Col> */}
            </Row>
            <RequestTable data={requestData} />
        </Space>
    );
};

export default Applications;
