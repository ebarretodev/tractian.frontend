import React, {useState} from "react";
import {Row, Col, Typography, Input, Form, Button, Radio, Switch, Slider, Select, message} from 'antd'
import axios from "axios";
import { useHistory } from "react-router";

const {Title} = Typography

const layout = {
    labelCol: { span: 8},
    wrapperCol: { span: 16 },
}

const FormApp = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const handleSubmit = (values: any) => {
        setLoading(true)
        axios.post(`http://localhost:5000/companies`,values)
            .then(res=>{
                setLoading(false)
                message.success('Company Added Successfully!')
                history.push('/companies')
            })
            .catch(error => {
                setLoading(false)
                message.error(error)
            })
    }
    return(
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
            Please Fill the User Form
            </Title>
        </Col>
        </Row>
        <Row gutter={[40, 0]}>
            <Col span={18}>
                <Form {...layout} onFinish={handleSubmit}>
                    <Form.Item name="name" label="Company Name" rules={[{
                        required: true,
                        message: 'Please input your Company name'
                    }]} >
                        <Input placeholder="Please enter your company name" />
                    </Form.Item>
                    <Form.Item name='address' label='Address' rules={[{
                        required:true,
                        message: 'Please input your correct address'
                    }]}>
                        <Input placeholder="Please enter your address" />
                    </Form.Item>
                    <Form.Item name='business' label='Business Segment' rules={[{
                        required: true,
                        message:'Please insert your business segment'
                    }]} >
                        <Input placeholder="Please insert your business segment"/>
                    </Form.Item>
                    <div style={{textAlign: "right"}} >
                        <Button type="primary" loading={loading} htmlType="submit">Save</Button>{'  '}
                        <Button type="primary" danger htmlType="button" onClick={()=>{history.push('/companies/')}}>Back</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    </div>
  );
}

export default FormApp;