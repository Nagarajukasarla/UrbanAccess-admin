import React, { useState } from "react";
import { Button, Modal, message } from "antd";
import Institutes from "../components/common/Institues";
import CreateDivision from "../components/common/CreateDivision"; // Import the form component
import { Division } from "../types/model";

const Divisions: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    return (
        <div>
            <Button type="primary" onClick={showModal} style={{ marginBottom: 16 }}>
                Add Division
            </Button>

            <Institutes />

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
