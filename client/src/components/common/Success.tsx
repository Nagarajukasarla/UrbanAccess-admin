import { Result } from "antd";
import React from "react";

const Success: React.FC = () => (
    <Result
        status="success"
        title="Successfully Verified"
        subTitle="Order number: 2017182818828182881 it takes 1-5 minutes to reflect."
    />
);

export default Success;
