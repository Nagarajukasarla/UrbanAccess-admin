import { Result } from "antd";
import React from "react";

const Rejected: React.FC = () => (
    <Result
        status="error"
        title="Rejection"
        subTitle="Order number: 2017182818828182881 it takes 1-5 minutes to reflect upon submission."
    />
);

export default Rejected;
