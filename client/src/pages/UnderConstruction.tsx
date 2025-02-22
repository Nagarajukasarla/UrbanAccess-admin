import React from "react";
import { Result, Button } from "antd";
import { ToolOutlined } from "@ant-design/icons";
import "../assets/css/UnderConstruction.css"; // Create this CSS file for animations
import { useNavigate } from "react-router-dom";

const UnderConstruction: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="full-container">
            <Result
                icon={
                    <div className="icon-container">
                        <ToolOutlined className="animated-icon" />
                    </div>
                }
                title={<span className="title-text">Page Under Construction</span>}
                subTitle={
                    <span className="subtitle-text">
                        We're working hard to bring this page to you soon. Please check back later!
                    </span>
                }
                extra={
                    <Button 
                        type="primary" 
                        onClick={() => navigate(-1)} // Uses React Router to navigate back
                        className="animated-button"
                    >
                        Go Back
                    </Button>
                }
            />
        </div>
    );
};


export default UnderConstruction;