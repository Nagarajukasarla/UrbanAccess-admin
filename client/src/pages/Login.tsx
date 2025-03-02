import { Button, Card, Form, Input, Typography, message } from "antd";
import React from "react";
import logo from "../assets/img/logo.jpg";
import APIResponse from "../classes/APIResponse";
import { authService } from "../services/api/authService";
import { userService } from "../services/api/userService";
import { LoginRequest } from "../types/api";
import { useNavigate } from "react-router-dom";

const { Text, Link } = Typography;

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = (values: { email: string; password: string }) => {
        console.log(`Values: ${values}`);
        handleLogin(values.email, values.password);
    };

    const handleLogin = (email: string, password: string) => {
        const loginRequest: LoginRequest = {
            email: email,
            password: password,
        };

        authService
            .loginWithPassword(loginRequest)
            .then((res) => {
                if (res.code === APIResponse.SUCCESS) {
                    userService.persistUser(res.data!);
                    navigate("/", { replace: true });
                } else if (res.code === APIResponse.NOT_FOUND) {
                    message.error({
                        content: (
                            <Typography.Text style={{ fontWeight: 500 }}>
                                User not found
                            </Typography.Text>
                        ),
                        key: "login",
                        duration: 3,
                    });
                    form.setFields([
                        {
                            name: "email",
                            errors: ["Invalid email"],
                        },
                    ]);
                } else if (res.code === APIResponse.UNAUTHORIZED) {
                    form.setFields([
                        {
                            name: "password",
                            errors: ["Invalid password"],
                        },
                    ]);
                    message.error({
                        content: (
                            <Typography.Text style={{ fontWeight: 500 }}>
                                Invalid Password
                            </Typography.Text>
                        ),
                        key: "login",
                        duration: 3,
                    });
                } else if (res.code === APIResponse.INTERNAL_SERVER_ERROR) {
                    message.error({
                        content: (
                            <Typography.Text style={{ fontWeight: 500 }}>
                                Internal server error
                            </Typography.Text>
                        ),
                        key: "login",
                        duration: 3,
                    });
                }
            })
            .catch((error) => {
                message.error({
                    content: error.message,
                    key: "login",
                    duration: 3,
                });
            });
    };

    // const authenticate = () => {
    //     authService.authenticate().then((res) => {
    //         console.log(res);
    //     });
    // };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card
                styles={{
                    body: {
                        padding: "10px 32px 20px 32px",
                    },
                }}
                style={{
                    width: 400,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: 8,
                    textAlign: "center",
                }}
            >
                <img
                    src={logo}
                    style={{
                        margin: "10px 0",
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        userSelect: "none",
                    }}
                />
                <Text
                    style={{
                        color: "rgba(33, 33, 33, 0.85)",
                        display: "block",
                        marginBottom: 24,
                        fontSize: 17,
                    }}
                >
                    Stay updated on your business world
                </Text>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Email is required",
                            },
                        ]}
                        style={{
                            textAlign: "left",
                            marginBottom: 30,
                        }}
                    >
                        <Input
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Enter Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Password is required",
                            },
                        ]}
                        style={{
                            textAlign: "left",
                            marginBottom: 30,
                        }}
                    >
                        <Input
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Enter Password"
                        />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        style={{
                            padding: "17px 12px",
                            fontSize: 18,
                            borderRadius: 50,
                            width: "70%",
                        }}
                    >
                        <Text
                            style={{
                                letterSpacing: "1px",
                                fontFamily: "Nunito Sans",
                                fontSize: 17,
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            Login
                        </Text>
                    </Button>
                    {/* <Button onClick={authenticate}>Authenticate</Button> */}
                </Form>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                    <Text>New to Urban Access? </Text>
                    <Link href="/register">Register Account</Link>
                </div>
            </Card>
        </div>
    );
};

export default Login;
