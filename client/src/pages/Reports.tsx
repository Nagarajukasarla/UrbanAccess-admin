import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    FileTextOutlined,
    LoadingOutlined
} from "@ant-design/icons";
import {
    Card,
    Col,
    Row,
    Space,
    Statistic,
    Spin
} from "antd";
import React, { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    Pie,
    PieChart,
    Tooltip,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Cell
} from "recharts";

interface ChartData {
    label: string;
    value: number;
}

interface ChartDataProps {
    data: ChartData[];
}

const ReportsPage: React.FC = () => {
    const [passReports, setPassReports] = useState<ChartData[]>([]);
    const [divisionReports, setDivisionReports] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        document.title = "Reports";
        loadData();
    }, []);

    const loadData = () => {
        // Simulate data loading with dummy data
        setTimeout(() => {
            setPassReports([
                { label: "Basic Pass", value: 500 },
                { label: "Silver Pass", value: 350 },
                { label: "Gold Pass", value: 200 },
                { label: "Platinum Pass", value: 150 },
            ]);

            setDivisionReports([
                { label: "Kukatpally", value: 4200 },
                { label: "Secunderabad", value: 3000 },
                { label: "Kondapur", value: 400 },
                { label: "Dilsuknagar", value: 250 },
                { label: "Ameerpet", value: 1800 },
            ]);
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="reports-container">
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <ReportCard
                        icon={<FileTextOutlined className="card-icon reports-card-icon" />}
                        title={"Total Passes Issued"}
                        value={"5,000"}
                        loading={loading}
                    />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <ReportCard
                        icon={<CheckCircleOutlined className="card-icon accepted-card-icon" />}
                        title={"Active Passes"}
                        value={"4,500"}
                        loading={loading}
                    />
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <ReportCard
                        icon={<CloseCircleOutlined className="card-icon expired-card-icon" />}
                        title={"Expired Passes"}
                        value={"500"}
                        loading={loading}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <Card className="chart-card">
                        <h3 className="chart-title">Pass Type Distribution</h3>
                        {loading ? (
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <ReportsPieChart data={passReports} />
                            </ResponsiveContainer>
                        )}
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card className="chart-card">
                        <h3 className="chart-title">Top Divisions by Pass Issuance</h3>
                        {loading ? (
                            <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <ReportsBarChart data={divisionReports} />
                            </ResponsiveContainer>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ReportsPage;

const ReportCard: React.FC<{ icon: React.ReactNode; title: string; value: string; loading?: boolean }> = ({
    icon,
    title,
    value,
    loading,
}) => {
    return (
        <Card className="report-card" hoverable>
            <Space direction="horizontal" className="report-card-content">
                {icon}
                <Statistic
                    title={title}
                    value={loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : value}
                />
            </Space>
        </Card>
    );
};

const ReportsPieChart: React.FC<ChartDataProps> = ({ data }) => {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <PieChart>
            <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ background: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
            />
            <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                animationDuration={1000}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
    );
};

const ReportsBarChart: React.FC<ChartDataProps> = ({ data }) => {
    return (
        <BarChart data={data}>
            <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={{ background: '#fff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
            />
            <XAxis dataKey="label" />
            <YAxis />
            <Bar dataKey="value" barSize={40} fill="#8884d8" animationDuration={1000} />
        </BarChart>
    );
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
            </div>
        );
    }
    return null;
};

// Inline CSS
const styles = `
.reports-container {
    padding: 24px;
    background-color: #f5f5f5;
    min-height: 100vh;
}

.report-card {
    text-align: center;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.report-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.report-card-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

.chart-card {
    padding: 20px;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
    width: 100%;
}

.chart-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 15px;
    color: #333;
}

.custom-tooltip {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.custom-tooltip .label {
    margin: 0;
    font-weight: bold;
    color: #333;
}`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);