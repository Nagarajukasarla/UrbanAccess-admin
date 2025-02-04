import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { Division } from "../../types/model";

// export type Division = {
//     id: number;
//     code: string;
//     name: string;
//     numberOfCollege?: number;
//     numberOfSchools?: number;
// };

type DivisionFormProps = {
    initialValues?: Division;
    onSubmit: (values: Division) => void;
};

const CreateDivision: React.FC<DivisionFormProps> = ({ initialValues, onSubmit }) => {
    const [form] = Form.useForm();

    return (
        <Form
            form={form}
            layout="vertical"
            initialValues={initialValues}
            onFinish={onSubmit}
        >
            <Form.Item label="ID" name="id" rules={[{ required: true, message: "ID is required" }]}>
                <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Code" name="code" rules={[{ required: true, message: "Code is required" }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Number of Colleges" name="numberOfCollege">
                <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Number of Schools" name="numberOfSchools">
                <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

// export default DivisionForm;
export default CreateDivision;
