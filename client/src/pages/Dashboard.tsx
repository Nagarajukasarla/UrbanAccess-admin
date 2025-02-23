import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    DownOutlined,
    LineChartOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import {
    Card,
    Col,
    Row,
    Select,
    Space,
    Statistic,
    Typography,
    message,
    Spin
} from "antd";
import { DefaultOptionType } from "antd/es/select";
import React, { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    Pie,
    PieChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import "../assets/css/dashboard.css";
import monthImg from "../assets/img/monthly.png";
import {
    ChartData,
    ChartDataProps,
    DashboardCardProps,
} from "../types/component";
import { dashboardService } from "../services/api/dashboardService";
import APIResponse from "../classes/APIResponse";

const Dashboard: React.FC = () => {
    const items: DefaultOptionType[] = [
        {
            value: "1",
            label: (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src={monthImg} width={20} height={20} alt="Monthly" />
                    <Typography.Text>Monthly Revenue</Typography.Text>
                </span>
            ),
        },
        {
            value: "2",
            label: (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src={monthImg} width={20} height={20} alt="Yearly" />
                    <Typography.Text>Yearly Revenue</Typography.Text>
                </span>
            ),
        },
    ];

    // State management
    const [selectedPeriod, setSelectedPeriod] = useState<string>(items[0]?.value as string);
    const [applications, setApplications] = useState<number>(0);
    const [accepted, setAccepted] = useState<number>(0);
    const [rejected, setRejected] = useState<number>(0);
    const [monthly, setMonthly] = useState<number>(0);
    const [passTypeAnalytics, setPassTypeAnalytics] = useState<ChartData[]>([]);
    const [divisionAnalytics, setDivisionAnalytics] = useState<ChartData[]>([]);
    const [revenueAnalytics, setRevenueAnalytics] = useState<ChartData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const loadData = async () => {
        try {
            setLoading(true);
            message.loading({ content: "Loading dashboard data...", key: "dashboard" });

            const [statsResponse, passResponse, divisionResponse] = await Promise.all([
                dashboardService.getDashboardStats(),
                dashboardService.getPassTypeAnalytics(),
                dashboardService.getDivisionAnalytics()
            ]);

            if (statsResponse.code === APIResponse.SUCCESS) {
                const stats = statsResponse.data;
                setApplications(stats.totalApplications);
                setAccepted(stats.acceptedApplications);
                setRejected(stats.rejectedApplications);
                setMonthly(stats.monthlyApplications);
            }

            if (passResponse.code === APIResponse.SUCCESS) {
                setPassTypeAnalytics(passResponse.data);
            }

            if (divisionResponse.code === APIResponse.SUCCESS) {
                setDivisionAnalytics(divisionResponse.data);
            }

            // Load initial revenue data
            await handlePeriodChange(selectedPeriod);

            message.success({ 
                content: "Dashboard loaded successfully!", 
                key: "dashboard" 
            });
        } catch (error) {
            message.error({
                content: "Failed to load dashboard data. Please try again.",
                key: "dashboard"
            });
            console.error("Dashboard loading error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePeriodChange = async (value: string) => {
        try {
            setSelectedPeriod(value);
            message.loading({ content: "Loading revenue data...", key: "revenue" });

            const response = await dashboardService.getRevenueAnalytics({
                period: value === "1" ? "monthly" : "yearly"
            });

            if (response.code === APIResponse.SUCCESS) {
                setRevenueAnalytics(response.data);
                message.success({ 
                    content: "Revenue data updated!", 
                    key: "revenue" 
                });
            } else {
                throw new Error(response.description);
            }
        } catch (error) {
            message.error({
                content: "Failed to load revenue data. Please try again.",
                key: "revenue"
            });
            console.error("Revenue loading error:", error);
        }
    };

    useEffect(() => {
        document.title = "Dashboard";
        loadData();
    }, []);

    return (
        <Spin spinning={loading}>
            <div>
                <Col>
                    <Space direction="vertical" size={"large"}>
                        <Row gutter={6}>
                            <DashboardCard
                                icon={
                                    <ShoppingCartOutlined className="card-icon orders-card-icon" />
                                }
                                title={"Applications"}
                                value={applications.toLocaleString()}
                                style={{ marginRight: "44px" }}
                            />
                            <DashboardCard
                                icon={
                                    <CheckCircleOutlined className="card-icon bills-closed-card-icon" />
                                }
                                title={"Accepted"}
                                value={accepted.toLocaleString()}
                                style={{ marginRight: "44px" }}
                            />
                            <DashboardCard
                                icon={
                                    <CloseCircleOutlined className="card-icon today-revenue-card-icon" />
                                }
                                title={"Rejected"}
                                value={rejected.toLocaleString()}
                                style={{ marginRight: "44px" }}
                            />
                            <DashboardCard
                                icon={
                                    <LineChartOutlined className="card-icon month-revenue-card-icon" />
                                }
                                title={"This Month"}
                                value={monthly.toLocaleString()}
                            />
                        </Row>
                        <Row>
                            <Space direction="horizontal" size={"large"}>
                                <Card>
                                    <div className="pieChartHeader">
                                        <p>Pass Type Analysis</p>
                                    </div>
                                    <DashboardPieChart data={passTypeAnalytics} />
                                </Card>
                                <Card>
                                    <div className="barChartHeader">
                                        <p>Top 10 Divisions</p>
                                    </div>
                                    <DashboardBarChart data={divisionAnalytics} />
                                </Card>
                            </Space>
                        </Row>
                        <Row>
                            <Card>
                                <div className="revenue-chart-card">
                                    <Select
                                        style={{ width: 200, marginBottom: 20 }}
                                        value={selectedPeriod}
                                        onChange={handlePeriodChange}
                                        options={items}
                                        suffixIcon={<DownOutlined />}
                                    />
                                    <RangedRevenueLinedChart
                                        data={revenueAnalytics}
                                    />
                                </div>
                            </Card>
                        </Row>
                    </Space>
                </Col>
            </div>
        </Spin>
    );
};

// Keep existing chart components unchanged
const DashboardCard: React.FC<DashboardCardProps> = ({
    icon,
    title,
    value,
    style,
}) => {
    return (
        <Card style={{ width: "220px", ...style }}>
            <Space
                direction="horizontal"
                style={{
                    marginLeft: "12px",
                }}
            >
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
};

const DashboardPieChart: React.FC<ChartDataProps> = ({ data }) => {
    return (
        <>
            <PieChart width={400} height={300}>
                <Tooltip />
                <Pie
                    data={data}
                    dataKey="value"
                    nameKey="label"
                    cx="45%"
                    cy="50%"
                    outerRadius={105}
                    fill="#8884d8"
                    label
                />
            </PieChart>
        </>
    );
};

const DashboardBarChart: React.FC<ChartDataProps> = ({ data }) => {
    return (
        <>
            <BarChart width={730} height={300} data={data}>
                <Tooltip />
                <XAxis dataKey="label" />
                <YAxis />
                <Bar dataKey="value" barSize={35} fill="#8884d8" />
            </BarChart>
        </>
    );
};

const RangedRevenueLinedChart: React.FC<ChartDataProps> = ({ data }) => {
    return (
        <LineChart
            width={1200}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
    );
};

export default Dashboard;