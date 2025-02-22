import React, { useRef, useState } from "react";
import {
    Card,
    Form,
    Input,
    Button,
    Typography,
    FormInstance,
    message,
} from "antd";
import OTPVerification from "../components/feature/OTPVerification";
import APIResponse from "../classes/APIResponse";
import { SignupRequest } from "../types/api";
import { authService } from "../services/api/authService";
const { Title, Text, Link } = Typography;

// Define interface for form values
interface RegisterFormValues {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register: React.FC = () => {
    const formRef = useRef<FormInstance>(null);
    const [form] = Form.useForm();
    const [showOTP, setShowOTP] = useState(false);
    const [email, setEmail] = useState("");

    // Password validation rules
    const validatePassword = (_: any, value: string) => {
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumber = /[0-9]/.test(value);

        if (!value) {
            return Promise.reject("Please enter password");
        }
        if (value.length < 8) {
            return Promise.reject(
                "Password must be at least 8 characters long"
            );
        }
        if (!hasLowerCase) {
            return Promise.reject(
                "Password must contain at least one lowercase letter"
            );
        }
        if (!hasNumber) {
            return Promise.reject("Password must contain at least one number");
        }
        return Promise.resolve();
    };

    // Confirm password validation
    const validateConfirmPassword = (_: any, value: string) => {
        if (!value) {
            return Promise.reject("Please confirm your password");
        }
        if (value !== form.getFieldValue("password")) {
            return Promise.reject("Passwords do not match");
        }
        return Promise.resolve();
    };

    // Email validation
    const validateEmail = (_: any, value: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            return Promise.reject("Please enter email");
        }
        if (!emailRegex.test(value)) {
            return Promise.reject("Please enter a valid email address");
        }
        return Promise.resolve();
    };

    const onFinish = async (values: RegisterFormValues) => {
        try {
            message.loading({ content: "Registering...", key: "register" });

            const { confirmPassword, ...registrationData } = values;

            // Convert to SignupRequest format
            const payload: SignupRequest = {
                firstName: registrationData.firstname,
                lastName: registrationData.lastname,
                email: registrationData.email,
                password: registrationData.password,
            };

            const response = await authService.signup(payload);

            if (response.code === APIResponse.SUCCESS) {
                message.success({
                    content: "Please verify your email!",
                    key: "register",
                    duration: 2,
                });
                setShowOTP(true);
                setEmail(registrationData.email);
            } else {
                throw new Error(response.description);
            }
        } catch (error) {
            message.error({
                content:
                    error instanceof Error
                        ? error.message
                        : "Registration failed. Please try again.",
                key: "register",
                duration: 2,
            });
            console.error("Registration error:", error);
        }
    };

    const handleVerify = async (otp: string) => {
        try {
            message.loading({ content: "Verifying...", key: "verify" });

            const response = await authService.verifyOtp(otp);

            if (response.code === APIResponse.SUCCESS) {
                message.success({
                    content: "Email verified successfully!",
                    key: "verify",
                    duration: 2,
                });
                // Redirect to login page
                window.location.href = "/login";
            } else {
                throw new Error(response.description);
            }
        } catch (error) {
            message.error({
                content:
                    error instanceof Error
                        ? error.message
                        : "Verification failed. Please try again.",
                key: "verify",
                duration: 2,
            });
        }
    };

    const handleResendOTP = async () => {
        try {
            message.loading({ content: "Sending OTP...", key: "resend" });

            // TODO: Replace with actual resend OTP API call
            await new Promise((resolve) => setTimeout(resolve, 1500));

            message.success({
                content: "OTP sent successfully!",
                key: "resend",
                duration: 2,
            });
        } catch (error) {
            message.error({
                content: "Failed to resend OTP. Please try again.",
                key: "resend",
                duration: 2,
            });
        }
    };

    if (showOTP) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <OTPVerification
                    email={email}
                    onVerify={handleVerify}
                    resendOTP={handleResendOTP}
                />
            </div>
        );
    }

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
                styles={{ body: { padding: "10px 32px 20px 32px" } }}
                style={{
                    width: 400,
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: 8,
                }}
            >
                <Title
                    level={3}
                    style={{
                        marginBottom: 8,
                        textAlign: "left",
                        fontWeight: "800",
                    }}
                >
                    Sign Up
                </Title>
                <Text
                    style={{
                        color: "rgba(33, 33, 33, 0.85)",
                        display: "block",
                        marginBottom: 24,
                        textAlign: "left",
                    }}
                >
                    Stay updated on your business world
                </Text>
                <Form
                    form={form}
                    ref={formRef}
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        name="firstname"
                        rules={[
                            {
                                required: true,
                                message: "First name is required",
                            },
                            {
                                min: 2,
                                message:
                                    "First name must be at least 2 characters",
                            },
                            {
                                max: 50,
                                message:
                                    "First name cannot exceed 50 characters",
                            },
                        ]}
                        style={{ textAlign: "left", marginBottom: 30 }}
                    >
                        <Input
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="First Name"
                            autoFocus={true}
                        />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        rules={[
                            {
                                required: true,
                                message: "Last name is required",
                            },
                            {
                                min: 2,
                                message:
                                    "Last name must be at least 2 characters",
                            },
                            {
                                max: 50,
                                message:
                                    "Last name cannot exceed 50 characters",
                            },
                        ]}
                        style={{ textAlign: "left", marginBottom: 30 }}
                    >
                        <Input
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Last Name"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[{ validator: validateEmail }]}
                        style={{ textAlign: "left", marginBottom: 30 }}
                    >
                        <Input
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ validator: validatePassword }]}
                        style={{ textAlign: "left", marginBottom: 30 }}
                    >
                        <Input.Password
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        rules={[{ validator: validateConfirmPassword }]}
                        style={{ textAlign: "left", marginBottom: 30 }}
                    >
                        <Input.Password
                            style={{ padding: "8px 12px", fontSize: 16 }}
                            placeholder="Confirm Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{
                                width: "50%",
                                padding: "18px 12px",
                                borderRadius: "50px",
                            }}
                            type="primary"
                            htmlType="submit"
                            block
                        >
                            <Text
                                style={{
                                    letterSpacing: "1px",
                                    fontFamily: "Nunito Sans",
                                    fontSize: 16,
                                    color: "#fff",
                                    fontWeight: "bold",
                                }}
                            >
                                Submit
                            </Text>
                        </Button>
                    </Form.Item>
                </Form>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                    <Text>Already have an account? </Text>
                    <Link href="/login">Login</Link>
                </div>
            </Card>
        </div>
    );
};

export default Register;
