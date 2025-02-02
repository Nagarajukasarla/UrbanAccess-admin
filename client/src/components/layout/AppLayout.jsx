import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./Sider";
import AppHeader from "./Header";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
    return (
        <Layout>
            <Header className="header">
                <AppHeader />
            </Header>
            <Layout>
                <Sider className="sider">
                    <SideBar />
                </Sider>
                <Content className="content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AppLayout;