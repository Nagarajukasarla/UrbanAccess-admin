import { SearchOutlined } from "@ant-design/icons";
import { Input, Space, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import "../assets/css/reports.css";
import { getNonPendingApplicationsFromLocalStorage } from "../services/local-storage/localStorageService";
import { Application, ApplicationStatus } from "../types/model";

interface Report {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    divisionId: number;
    passId?: number;
    status: ApplicationStatus;
}

const ReportsPage: React.FC = () => {
    const [hoveredRowKey, setHoveredRowKey] = useState<number | null>(null);
    const [reports, setReports] = useState<Report[]>([]);
    const [searchText, setSearchText] = useState("");
    const [filteredData, setFilteredData] = useState<Report[]>([]);

    useEffect(() => {
        document.title = "Reports";
        loadData();
    }, []);

    useEffect(() => {
        if (searchText === "") {
            setFilteredData(reports);
        } else {
            const filtered = reports.filter(
                ({ firstName, lastName, email, mobile }) =>
                    [firstName, lastName, email, mobile].some((field) =>
                        field.toLowerCase().includes(searchText.toLowerCase())
                    )
            );
            setFilteredData(filtered);
        }
    }, [searchText, reports]);

    const loadData = () => {
        const nonPendingApplications: Application[] =
            getNonPendingApplicationsFromLocalStorage();
        const newReports: Report[] = nonPendingApplications.map(
            (application) => ({
                id: application.id,
                firstName: application.personalInfo.firstName,
                lastName: application.personalInfo.lastName,
                email: application.personalInfo.email || "",
                mobile: application.mobile,
                divisionId: application.divisionId,
                passId: application.passId,
                status: application.status || ("Pending" as ApplicationStatus),
            })
        );
        setReports(newReports);
        setFilteredData(newReports);
    };

    const columns: ColumnsType<Report> = [
        { 
            title: "ID", 
            dataIndex: "id", 
            key: "id",
            render: (id: number) => {
                return <Typography.Text>{id}</Typography.Text>
            }
        },
        { 
            title: "First Name", 
            dataIndex: "firstName", 
            key: "firstName",
            render: (firstName: string) => {
                return <Typography.Text>{firstName}</Typography.Text>
            }
        },
        { 
            title: "Last Name", 
            dataIndex: "lastName", 
            key: "lastName",
            render: (lastName: string) => {
                return <Typography.Text>{lastName}</Typography.Text>
            }
        },
        { 
            title: "Email", 
            dataIndex: "email", 
            key: "email",
            render: (email: string) => {
                return <Typography.Text>{email}</Typography.Text>
            }
        },
        { 
            title: "Mobile", 
            dataIndex: "mobile", 
            key: "mobile",
            render: (mobile: string) => {
                return <Typography.Text>{mobile}</Typography.Text>
            }
        },
        { 
            title: "Division ID", 
            dataIndex: "divisionId", 
            key: "divisionId",
            render: (divisionId: number) => {
                return <Typography.Text>{divisionId}</Typography.Text>
            }
        },
        { 
            title: "Pass ID", 
            dataIndex: "passId", 
            key: "passId",
            render: (passId: number) => {
                return <Typography.Text>{passId}</Typography.Text>
            }
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: ApplicationStatus) => {
                let tagColor = "";
                switch (status) {
                    case "Approved":
                        tagColor = "ant-tag-green";
                        break;
                    case "Pending":
                        tagColor = "ant-tag-yellow";
                        break;
                    case "Rejected":
                        tagColor = "ant-tag-red";
                        break;
                    default:
                        tagColor = "ant-tag-default";
                }
                return <Tag className={tagColor}>{status}</Tag>;
            },
        },
    ];

    return (
        <div className="reports-container">
            <div className="reports-header">
                <Typography.Title level={2}>Reports</Typography.Title>
                <Space>
                    <Input
                        placeholder="Type to Search..."
                        prefix={<SearchOutlined />}
                        className="search-input"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Space>
            </div>
            <Table<Report>
                columns={columns}
                dataSource={filteredData.map((report) => ({
                    ...report,
                    key: report.id,
                }))}
                pagination={{ pageSize: 10 }}
                className="reports-table"
                onRow={(record) => ({
                    onMouseEnter: () => setHoveredRowKey(record.id),
                    onMouseLeave: () => setHoveredRowKey(null),
                })}
                rowClassName={(record) =>
                    record.id === hoveredRowKey ? "hovered-row" : ""
                }
            />
        </div>
    );
};

export default ReportsPage;
