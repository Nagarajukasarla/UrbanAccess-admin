import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const navigateTo = (path: string): void => {
    navigate(path);
    console.log(`Navigating from ${window.location.pathname} to ${path}`);
  };

  return (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
            <Button type="primary" onClick={() => navigateTo("/")}>
                Back Home
            </Button>
            }
    />
  );
};

export default NotFound;
