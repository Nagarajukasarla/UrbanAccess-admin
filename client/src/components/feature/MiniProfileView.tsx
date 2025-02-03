import React, { useState } from "react";
import { Button, Card, Modal, Typography, message } from "antd";
import { EditOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import FileUploader from "../feature/FileUploader";
import "../../assets/css/miniProfileView.css";
import { RcFile } from "antd/es/upload";
import useUserState from "../../states/userState";

const MiniProfileView: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // const { liteUser} = useUserState();
    const liteUser = {
        name: "Radha Krishna",
        image: "data:image/jpeg;base64,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", // Dummy profile picture
    };
    

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedFile(null); // Reset selected file when closing modal
    };

    const handleFileChange = (file: RcFile | null) => {
        setSelectedFile(file);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            message.error("Please select an image first");
            return;
        }

        try {
            setIsUploading(true);
            // Simulate API call to upload the file
            console.log("Uploading file:", selectedFile);

            message.success("Profile picture updated successfully");
            setIsModalOpen(false); // Close modal after successful upload
            setSelectedFile(null); // Reset selected file after successful upload
        } catch (error) {
            message.error("Failed to update profile picture");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="mini-profile-view">
            <div className="profile-pic">
                {liteUser?.image && (
                    <img
                        src={liteUser.image}
                        width={100}
                        height={100}
                        alt="profile-pic"
                    />
                )}
                {!liteUser?.image && <UserOutlined className="default-icon" />}
                <div className="edit-icon" onClick={showModal}>
                    <EditOutlined />
                </div>
            </div>
            <Typography.Text className="profile-name">
                {liteUser?.name || ""}
            </Typography.Text>
            <Card className="card card-1"></Card>
            <Card className="card card-2"></Card>
            <Card className="card card-3"></Card>
            <Button className="logout-button">
                Logout
                <LogoutOutlined />
            </Button>

            <Modal
                title="Update Avatar"
                open={isModalOpen}
                okText="Upload"
                onOk={handleUpload}
                onCancel={handleCancel}
                confirmLoading={isUploading}
                okButtonProps={{ disabled: !selectedFile }}
            >
                <FileUploader onFileChange={handleFileChange} loading={isUploading}/>
            </Modal>
        </div>
    );
};

export default MiniProfileView;
