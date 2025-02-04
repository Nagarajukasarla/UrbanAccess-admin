import React, { useEffect, useState } from "react";
import { ApplicantProfile } from "../components/feature/ApplicantProfile";
import { CollegeStudentApplication } from "../types/model";
import { collegeStudentApplications } from "../data/components";
import { Row } from "antd";

export const VerifyApplication: React.FC = () => {
    const [data, setData] = useState<CollegeStudentApplication>();

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
        <Row>
            <ApplicantProfile application={data} original={true} />
            <ApplicantProfile application={data} original={false} />
        </Row>
    );
};
