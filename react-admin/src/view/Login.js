/* eslint-disable react/prop-types */
import React, { useState,useEffect } from 'react';

import {Form, Input, Button, Checkbox, Card} from 'antd';
import {useSelector, useDispatch, connect} from 'react-redux';
import { login } from '@/actions/authActions';
import {useLocation, useNavigate} from "react-router-dom";
const Login = ({login}) => {
    const isAuthenticated = useSelector(state => state?.auth?.isAuthenticated);
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
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.


    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card title="登录" style={{ width: 300 }}>
                <Form
                    form={form}
                    name="login"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
        >
            <Input.Password placeholder="Password" />
        </Form.Item>
    <Form.Item shouldUpdate={true}>
        {() => (
            <Button
                type="primary"
                htmlType="submit"
                disabled={
                    !form.isFieldsTouched(true) ||
                    form.getFieldsError().filter(({ errors }) => errors.length).length
                }
            >
                登录
            </Button>
        )}
    </Form.Item>
</Form>
</Card>
</div>
    );
};

export default connect(null, {login})(Login)
