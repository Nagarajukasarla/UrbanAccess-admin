import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    LineChartOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card, Col, message, Row, Space, Spin, Statistic } from "antd";
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
import {
    divisionAnalyticsData,
    passTypeAnalyticsData,
    weeklyRevenueAnalyticsData,
} from "../data/components";
import {
    ChartData,
    ChartDataProps,
    DashboardCardProps,
} from "../types/component";
import { DashboardStats } from "../types/local-data";
import { getApplicationStatisticsFromLocalStorage } from "../services/local-storage/localStorageService";

const Dashboard: React.FC = () => {
    // State management

    const [dashboardStats, setDashboardStats] = useState<DashboardStats>();
    const [passTypeAnalytics, setPassTypeAnalytics] = useState<ChartData[]>([]);
    const [divisionAnalytics, setDivisionAnalytics] = useState<ChartData[]>([]);
    const [weeklyRevenueAnalytics, setWeeklyRevenueAnalytics] = useState<
        ChartData[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);

    const loadData = async () => {
        try {
            setLoading(true);
            message.loading({
                content: "Loading dashboard data...",
                key: "dashboard",
            });

            setDashboardStats(getApplicationStatisticsFromLocalStorage());
            setPassTypeAnalytics(passTypeAnalyticsData);
            setDivisionAnalytics(divisionAnalyticsData);
            setWeeklyRevenueAnalytics(weeklyRevenueAnalyticsData);

            message.success({
                content: "Dashboard loaded successfully!",
                key: "dashboard",
            });
        } catch (error) {
            message.error({
                content: "Failed to load dashboard data. Please try again.",
                key: "dashboard",
            });
            console.error("Dashboard loading error:", error);
        } finally {
            setLoading(false);
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
                                value={
                                    dashboardStats?.totalApplications.toLocaleString() ||
                                    "0"
                                }
                                style={{ marginRight: "44px" }}
                            />
                            <DashboardCard
                                icon={
                                    <CheckCircleOutlined className="card-icon bills-closed-card-icon" />
                                }
                                title={"Accepted"}
                                value={
                                    dashboardStats?.approvedApplications.toLocaleString() ||
                                    "0"
                                }
                                style={{ marginRight: "44px" }}
                            />
                            <DashboardCard
                                icon={
                                    <CloseCircleOutlined className="card-icon today-revenue-card-icon" />
                                }
                                title={"Rejected"}
                                value={
                                    dashboardStats?.rejectedApplications.toLocaleString() ||
                                    "0"
                                }
                                style={{ marginRight: "44px" }}
                            />
                            <DashboardCard
                                icon={
                                    <LineChartOutlined className="card-icon month-revenue-card-icon" />
                                }
                                title={"This Month"}
                                value={
                                    dashboardStats?.monthlyRevenue.toLocaleString() ||
                                    "0"
                                }
                            />
                        </Row>

                        <Row>
                            <Space direction="horizontal" size={"large"}>
                                <Card>
                                    <div className="pieChartHeader">
                                        <p>Pass Type Analysis</p>
                                    </div>
                                    <DashboardPieChart
                                        data={passTypeAnalytics}
                                    />
                                </Card>
                                <Card>
                                    <div className="barChartHeader">
                                        <p>Divisions</p>
                                    </div>
                                    <DashboardBarChart
                                        data={divisionAnalytics}
                                    />
                                </Card>
                            </Space>
                        </Row>
                        <Row>
                            <Card>
                                <RangedRevenueLinedChart
                                    data={weeklyRevenueAnalytics}
                                />
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
