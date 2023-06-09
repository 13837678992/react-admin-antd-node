/* eslint-disable react/prop-types */
import React, { useState,useEffect } from 'react';

import { Form, Input, Button,Checkbox } from 'antd';
import {useSelector, useDispatch, connect} from 'react-redux';
import { login } from 'actions/authActions';
import {useLocation, useNavigate} from "react-router-dom";
const Login = ({login}) => {
    const isAuthenticated = useSelector(state => state?.auth?.isAuthenticated);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        console.log(location,'location')
        if (isAuthenticated){
            navigate('/')
        }
    },[isAuthenticated])
    const onFinish = (values) => {
        login(values.username,values.password);
        console.log(location,'location')
        const from = location?.state?.from || '/';
        console.log(from,'from')
        setTimeout(()=>{

        navigate(from)
        },100)
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default connect(null, {login})(Login)
