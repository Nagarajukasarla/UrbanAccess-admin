import { Result } from "antd";
import React from "react";

const Rejected: React.FC = () => (
    <Result
        status="error"
        title="Rejected"
        subTitle="Order number: 2017182818828182881 it takes 1-5 minutes to reflect."
    />
);

export default Rejected;
