import React, { useEffect, useState } from "react";
import { ApplicantProfile } from "../components/feature/ApplicantProfile";
import { CollegeStudentApplication } from "../types/model";
import { collegeStudentApplications } from "../data/components";
import { Button, Col, Modal, Row, Typography, Result, Spin, Input } from "antd";
import ApplicantDetailsView from "../components/feature/ApplicantDetailsView";
import Success from "../components/common/Success";
import Rejected from "../components/common/Rejected";
import { updateApplicationStatusInLocalStorage } from "../services/local-storage/localStorageService";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

export const VerifyApplication: React.FC = () => {
    const [data, setData] = useState<CollegeStudentApplication>();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isRejected, setIsRejected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [rejectReason, setRejectReason] = useState("");

    const navigate = useNavigate();

    const loadApplicationData = async (applicationId: number) => {
        try {
            setIsLoading(true);
            const application = collegeStudentApplications.find(
                (app) => app.id === applicationId
            );
            setData(application);
        } catch (error) {
            console.error("Error loading application data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadApplicationData(Number(document.location.pathname.split("/")[3]));
    }, []);

    const handleApprove = () => {
        if (isRejected) setIsRejected(false);
        setIsSuccess(true);
        updateApplicationStatusInLocalStorage(data?.id!, "Approved");
    };

    const handleReject = () => {
        if (isSuccess) setIsSuccess(false);
        setIsRejected(true);
    };

    const handleRejectConfirm = () => {
        console.log("Rejected reason:", rejectReason);
        updateApplicationStatusInLocalStorage(data?.id!, "Rejected");
        setIsRejected(false);
        setRejectReason("");
    };

    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Spin size="large" tip="Loading application data..." />
            </div>
        );
    }

    if (!data) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    padding: "2rem",
                }}
            >
                <Result
                    status="warning"
                    title="No Application Data Available"
                    subTitle="It seems there are no applications to verify at the moment. Please check back later or contact support if you believe this is an error."
                    extra={
                        <Button type="primary" onClick={() => navigate(-1)}>
                            Go Back
                        </Button>
                    }
                />
            </div>
        );
    }

    return (
        <Col>
            <Row>
                <Col span={12}>
                    <Typography.Title level={3} style={{ marginLeft: 20 }}>
                        Submitted Application
                    </Typography.Title>
                    <ApplicantDetailsView application={data} />
                </Col>
                <Col span={12}>
                    <Typography.Title level={3} style={{ marginLeft: 20 }}>
                        Original Details
                    </Typography.Title>
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
                    onClick={handleApprove}
                >
                    <Typography.Text>Approve</Typography.Text>
                </Button>
                <Button
                    style={{
                        padding: 20,
                        backgroundColor: "red",
                        color: "white",
                    }}
                    onClick={handleReject}
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
                onOk={handleRejectConfirm}
            >
                <Rejected />
                <Typography.Title level={5} style={{ marginTop: 20 }}>
                    Please provide the reason for rejection:
                </Typography.Title>
                <TextArea
                    rows={4}
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter reason here..."
                />
            </Modal>
        </Col>
    );
};
