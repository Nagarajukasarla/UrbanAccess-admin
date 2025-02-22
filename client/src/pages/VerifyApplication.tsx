import React, { useEffect, useState } from "react";
import { ApplicantProfile } from "../components/feature/ApplicantProfile";
import { CollegeStudentApplication } from "../types/model";
import { collegeStudentApplications } from "../data/components";
import { Button, Col, Modal, Row, Typography } from "antd";
import ApplicantDetailsView from "../components/feature/ApplicantDetailsView";
import Success from "../components/common/Success";
import Rejected from "../components/common/Rejected";

export const VerifyApplication: React.FC = () => {
    const [data, setData] = useState<CollegeStudentApplication>();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isRejected, setIsRejected] = useState(false);

    useEffect(() => {
        loadApplicationData(Number(document.location.pathname.split("/")[3]));
        console.log(data);
    }, []);

    const loadApplicationData = (id: number): void => {
        setData(collegeStudentApplications.find((app) => app.id === id));
        console.log(data);
    };

    if (!data) {
        return <div>No data available...</div>;
    }

    return (
        <Col>
            <Row>
                <Col span={12}>
                    <Typography.Title level={3}>New Application</Typography.Title>
                    <ApplicantDetailsView application={data} />
                </Col>
                <Col span={12}>
                    <Typography.Title level={3}>Previous Application</Typography.Title>
                    <ApplicantProfile application={data} />
                </Col>
            </Row>
            <Row
                style={{
                    marginLeft: 20,
                    width: 200,
                    justifyContent: "space-between",
                }}
            >
                <Button
                    style={{
                        padding: 20,
                        backgroundColor: "#085111",
                        color: "white",
                    }}
                    onClick={() => {
                        if (isRejected) {
                            setIsRejected(false);
                        }
                        setIsSuccess(true);
                    }}
                >
                    <Typography.Text>Approve</Typography.Text>
                </Button>
                <Button
                    style={{
                        padding: 20,
                        backgroundColor: "red",
                        color: "white",
                    }}
                    onClick={() => {
                        if (isSuccess) {
                            setIsSuccess(false);
                        }
                        setIsRejected(true);
                    }}
                >
                    <Typography.Text>Reject</Typography.Text>
                </Button>
            </Row>
            <Modal
                open={isSuccess}
                onCancel={() => setIsSuccess(false)}
                onOk={() => setIsSuccess(false)}
            >
                <Success />
            </Modal>
            <Modal
                open={isRejected}
                onCancel={() => setIsRejected(false)}
                onOk={() => setIsRejected(false)}
            >
                <Rejected />
            </Modal>
        </Col>
    );
};
