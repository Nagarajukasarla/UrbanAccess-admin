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
    Typography
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

const Dashboard: React.FC = () => {
    const items: DefaultOptionType[] = [
        {
            value: "1",
            label: (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src={monthImg} width={20} height={20} />
                    <Typography.Text>Monthly Revenue</Typography.Text>
                </span>
            ),
        },
        {
            value: "2",
            label: (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <img src={monthImg} width={20} height={20} />
                    <Typography.Text>Yearly Revenue</Typography.Text>
                </span>
            ),
        },
    ];

    const [passTypeAnalytics, setPassTypeAnalytics] = useState<ChartData[]>([]);
    const [divisionAnalytics, setDivisionAnalytics] = useState<ChartData[]>([]);
    const [revenueAnalytics, setRevenueAnalytics] = useState<ChartData[]>([]);

    const [selectedPeriod, setSelectedPeriod] = useState<string>(items[0]?.value as string);

    const handlePeriodChange = (value: string) => {
        setSelectedPeriod(value);
        console.log(value);
    };
    useEffect(() => {
        document.title = "Dashboard";
        loadData();
    }, []);

    const loadData = () => {
        const companyAnalytics: ChartData[] = [
            { label: "Basic Pass", value: 400 },
            { label: "Silver Pass", value: 300 },
            { label: "Gold Pass", value: 100 },
            { label: "Platinum Pass", value: 200 },
        ];

        const productAnalytics: ChartData[] = [
            { label: "Kukatpally", value: 4000 },
            { label: "Secunderabad", value: 2800 },
            { label: "Kondapur", value: 300 },
            { label: "Dilsuknagar", value: 100 },
            { label: "Ameerpet", value: 1600 },
            { label: "Afzalgunj", value: 1700 },
            { label: "Kapra", value: 200 },
            { label: "Nizampet", value: 150 },
            { label: "Nampally", value: 200 },
            { label: "Miyapur", value: 789 },
            { label: "Gachibowli", value: 459 },
        ];

        const revenueAnalytics: ChartData[] = [
            { label: "January", value: 1000 },
            { label: "February", value: 200 },
            { label: "March", value: 7000 },
            { label: "April", value: 6000 },
            { label: "May", value: 8000 },
            { label: "June", value: 670 },
            { label: "July", value: 700 },
            { label: "August", value: 10 },
            { label: "September", value: 9000 },
            { label: "October", value: 10000 },
            { label: "November", value: 500 },
            { label: "December", value: 12000 },
        ];

        setPassTypeAnalytics(companyAnalytics);
        setDivisionAnalytics(productAnalytics);
        setRevenueAnalytics(revenueAnalytics);
    };

    return (
        <div>
            <Col>
                <Space direction="vertical" size={"large"}>
                    <Row gutter={6}>
                        <DashboardCard
                            icon={
                                <ShoppingCartOutlined className="card-icon orders-card-icon" />
                            }
                            title={"Applications"}
                            value={"1,234"}
                            style={{ marginRight: "44px" }}
                        />
                        <DashboardCard
                            icon={
                                <CheckCircleOutlined className="card-icon bills-closed-card-icon" />
                            }
                            title={"Accepted"}
                            value={"1,234"}
                            style={{ marginRight: "44px" }}
                        />
                        <DashboardCard
                            icon={
                                <CloseCircleOutlined className="card-icon today-revenue-card-icon" />
                            }
                            title={"Rejected"}
                            value={"1,234"}
                            style={{ marginRight: "44px" }}
                        />
                        <DashboardCard
                            icon={
                                <LineChartOutlined className="card-icon month-revenue-card-icon" />
                            }
                            title={"This Month"}
                            value={"1,234"}
                        />
                    </Row>
                    <Row>
                        <Space direction="horizontal" size={"large"}>
                            <Card>
                                <div className="pieChartHeader">
                                    <p>Analysis</p>
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
    );
};

export default Dashboard;

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
                    dataKey={"value"}
                    cx="45%"
                    cy="50%"
                    outerRadius={105}
                    color="#8884d8"
                    label
                ></Pie>
            </PieChart>
        </>
    );
};

const DashboardBarChart: React.FC<ChartDataProps> = ({ data }) => {
    return (
        <>
            <BarChart width={730} height={300} data={data}>
                <Tooltip />
                <XAxis dataKey={"name"} />
                <YAxis />
                <Bar dataKey={"value"} barSize={35} fill="#8884d8" />
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
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
    );
};
