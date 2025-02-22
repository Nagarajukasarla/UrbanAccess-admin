import { Card, Typography, Tag, Row, Col, Divider } from "antd";
import { CollegeStudentApplication } from "../../types/model";
import {
    MailOutlined,
    PhoneOutlined,
    HomeOutlined,
    CalendarOutlined,
    IdcardOutlined,
} from "@ant-design/icons";
import "../../assets/css/applicantProfile.css";

interface ApplicantProfileProps {
    application: CollegeStudentApplication;
}

export const ApplicantProfile: React.FC<ApplicantProfileProps> = ({
    application,
}) => {
    const {
        personalInfo,
        address,
        tenthBoard,
        isSupplementary,
        admissionId,
        rollNumber,
        joiningDate,
        leavingDate,
        course,
        currentYear,
    } = application;

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <Card className="applicant-profile-card">
            <div className="profile-header">
                <div className="profile-avatar">
                    {personalInfo.firstName.charAt(0)}
                    {personalInfo.lastName.charAt(0)}
                </div>
                <div className="profile-title">
                    <Typography.Title level={3}>
                        {personalInfo.firstName} {personalInfo.lastName}
                    </Typography.Title>
                    <div className="profile-subtitle">
                        {course && <Tag color="blue">{course}</Tag>}
                        {currentYear && (
                            <Tag color="geekblue">Year {currentYear}</Tag>
                        )}
                        <Tag color={isSupplementary ? "orange" : "green"}>
                            {isSupplementary ? "Supplementary" : "Regular"}
                        </Tag>
                    </div>
                </div>
            </div>

            <Divider />

            <Row gutter={[24, 24]}>
                <Col span={12}>
                    <div className="info-section">
                        <Typography.Title level={5}>
                            Personal Information
                        </Typography.Title>
                        <div className="info-item">
                            <CalendarOutlined /> Date of Birth:{" "}
                            {formatDate(personalInfo.dob)}
                        </div>
                        <div className="info-item">
                            <IdcardOutlined /> Gender: {personalInfo.gender}
                        </div>
                        {personalInfo.email && (
                            <div className="info-item">
                                <MailOutlined /> {personalInfo.email}
                            </div>
                        )}
                        {personalInfo.gaurdianName && (
                            <div className="info-item">
                                Guardian: {personalInfo.gaurdianName}
                            </div>
                        )}
                        {personalInfo.gaurdianMobile && (
                            <div className="info-item">
                                <PhoneOutlined /> {personalInfo.gaurdianMobile}
                            </div>
                        )}
                    </div>
                </Col>

                <Col span={12}>
                    <div className="info-section">
                        <Typography.Title level={5}>
                            Academic Information
                        </Typography.Title>
                        <div className="info-item">
                            Board: <Tag color="purple">{tenthBoard}</Tag>
                        </div>
                        <div className="info-item">
                            Tenth ID: {application.tenthId}
                        </div>
                        {admissionId && (
                            <div className="info-item">
                                Admission ID: {admissionId}
                            </div>
                        )}
                        {rollNumber && (
                            <div className="info-item">
                                Roll Number: {rollNumber}
                            </div>
                        )}
                        <div className="info-item">
                            Joining Date: {formatDate(joiningDate)}
                        </div>
                        {leavingDate && (
                            <div className="info-item">
                                Leaving Date: {formatDate(leavingDate)}
                            </div>
                        )}
                    </div>
                </Col>
            </Row>

            <Divider />

            <div className="info-section">
                <Typography.Title level={5}>Address</Typography.Title>
                <div className="address-container">
                    <HomeOutlined className="address-icon" />
                    <div>
                        <div>
                            {address.houseNumber}, {address.addressLine1}
                        </div>
                        <div>
                            {address.street}, {address.locality}
                        </div>
                        <div>
                            {address.area}, {address.city} - {address.pincode}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default ApplicantProfile;
