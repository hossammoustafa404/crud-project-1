import React, { useEffect, useState } from "react";
import NewWrapper, { StyledAlert } from "./styles";
import Container from "../../components/container/Container";
import { Button, Form, Input, Radio, Alert } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewUser = () => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errorsObj, setErrorsObj] = useState({});
  const [form] = Form.useForm();
  const params = useParams();

  const navigate = useNavigate();

  const handleFinish = async (values) => {
    setLoading(true);
    if (!params.userId) {
      const { data: msg } = await axios.post(
        "http://localhost:5000/api/v1/users",
        values
      );

    } else {
      const { data } = await axios.patch(
        `http://localhost:5000/api/v1/users/${params.userId}`,
        values
      );
    }
    setLoading(false);
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  useEffect(() => {
    if (params.userId) {
      fetch(`http://localhost:5000/api/v1/users/${params.userId}`)
        .then((res) => res.json())
        .then((data) => {
          const { name, email, gender, status } = data.user;
          form.setFieldsValue({ name, email, gender, status });
        });
    }
  }, []);

  return (
    <NewWrapper>
      <Container>
        <Button
          htmlType="button"
          onClick={() => navigate("/")}
          className="back-btn"
        >
          back to users
        </Button>
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          {/* Name */}
          <Form.Item
            name="name"
            label="name"
            rules={[
              {
                required: true,
                message: "Name must be provided",
              },
              {
                max: 20,
                message: "Name must not exceed 20 characters.",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="The name must not exceed 20 characters" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            name="email"
            label="email"
            rules={[
              {
                required: true,
                message: "Email must be provided",
              },
              {
                type: "email",
                message: "Invalid email format",
              },
              {
                max: 50,
                message: "Name must not exceed 20 characters.",
              },
              {
                validator: ({ value }) => {
                  if (value && errorsObj.email) {
                    return Promise.reject(new Error(errorsObj.email));
                  } else {
                    return Promise.resolve();
                  }
                },
              },
            ]}
            hasFeedback
          >
            <Input placeholder="The name must not exceed 50 characters" />
          </Form.Item>

          {/* Gender*/}
          <Form.Item
            name="gender"
            label="gender"
            rules={[
              {
                required: true,
                message: "Gender must be provided",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="male">male</Radio>
              <Radio value="female">female</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Status */}
          <Form.Item name="status" label="status">
            <Radio.Group>
              <Radio value="inactive">inactive</Radio>
              <Radio value="active">active</Radio>
            </Radio.Group>
          </Form.Item>

          <Button
            htmlType="submit"
            block
            className="submit-btn"
            loading={loading}
          >
            save
          </Button>
        </Form>
      </Container>
      <StyledAlert
        message="Saved successfully."
        type="success"
        showIcon
        // action={
        //   <Button size="small" type="text">
        //     UNDO
        //   </Button>
        // }
        closable
        show={show}
      />
    </NewWrapper>
  );
};

export default NewUser;
