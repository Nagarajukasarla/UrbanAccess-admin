import React from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import AppLayout from "../components/layout/AppLayout";
import RouteGuard from "./RouterGuard";

// const Login = React.lazy(() => import("../pages/Login"));
// const Register = React.lazy(() => import("../pages/Register"));

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Applications = React.lazy(() => import("../pages/Applications"));
const UserManagement = React.lazy(() => import("../pages/UserManagement"));
const Settings = React.lazy(() => import("../pages/Settings"));
const Invoice = React.lazy(() => import("../pages/Invoice"));

const NotFound = React.lazy(() => import("../pages/NotFound"));

const AppRoutes: React.FC = () => (
    <React.Suspense fallback={<Spinner />} >
        <Routes>
            {/* Auth routes - No Layout */}
            {/* <Route path="/login" element={
                <RouteGuard isAuthPage={true}>
                    <Login />
                </RouteGuard>
            } /> */}
            {/* <Route path="/register" element={
                <RouteGuard isAuthPage={true}>
                    <Register />
                </RouteGuard>
            } /> */}

            {/* App Routes - With AppLayout */}
            <Route element={
                <RouteGuard>
                    <AppLayout />
                </RouteGuard>
            }>
                <Route path="/" element={<Dashboard />} />
                <Route path="/app">
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="invoice" element={<Invoice />} />
                    <Route path="applications" element={<Applications />} />
                    <Route path="user-management" element={<UserManagement />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    </React.Suspense>
);

export default AppRoutes;