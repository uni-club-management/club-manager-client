import React, {useState} from 'react';
import {
    Button,
    Card,
    Flex,
    Form,
    Input,
    message,
    Select,
    Steps,
    theme,
    Upload, UploadFile, UploadProps
} from 'antd';
import {InboxOutlined, LoadingOutlined, PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import Dragger from "antd/es/upload/Dragger";
import {useNavigate} from "react-router-dom";



const NewClubPage = () => {
    const {token} = theme.useToken();
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    const steps = [
        {
            title: 'First',
            content: <FirstStepForm/>
        },
        {
            title: 'Second',
            content: <SecondStepForm/>,
        },
        {
            title: 'third',
            content: <ThirdStepForm/>,
        }
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({key: item.title, title: item.title}));

    const contentStyle: React.CSSProperties = {
        minHeight: '80vh',
        minWidth: '50vw',
        textAlign: 'center',
        marginTop: 16,
        padding: 24,
    };

    return (
        <Flex justify={"center"} align={"center"} style={{minHeight: '100vh',backgroundColor:token.colorFillAlter}}>

            <Card bordered={false} style={contentStyle} title={"Club Creation Form"}>
                <Steps current={current} items={items}/>
                {steps[current].content}
                <Flex justify={"space-between"} style={{marginTop: 24}}>
                    {current > 0 && (
                        <Button style={{margin: '0 8px'}} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => navigate('/login')}>
                            Done
                        </Button>
                    )}

                </Flex>
            </Card>

        </Flex>
    );
};

export default NewClubPage;


const FirstStepForm = () => {
    const [form] = Form.useForm();



    return (
        <Flex style={{width: '100%', marginTop:24}} justify={'center'}>
            <Form form={form} layout="vertical" style={{width:500}}>
                <Form.Item
                    name="name"
                    label="Club Name"
                    required
                    rules={[{ required: true, message: 'Club Name is required' }]}
                >
                    <Input placeholder="Enter Club Name" style={{ width: '100%' }}  />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Description"
                    required
                    rules={[{ required: true, message: 'Description is required' }]}
                >
                    <Input.TextArea placeholder="Enter Description" style={{ width: '100%' }}  />
                </Form.Item>
                <Form.Item
                    name={"supervisor"}
                    label={"Supervisor"}
                >
                    <Select placeholder={"Select a supervisor if needed"}>
                        <Select.Option value={"1"}>Najib Mehdi</Select.Option>
                        <Select.Option value={"2"}>Basma Guermah</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Flex>
    );
};


const SecondStepForm = () => {
    const [form] = Form.useForm();



    return (
        <Flex style={{width: '100%', marginTop:24}} justify={'center'}>
            <Form form={form} layout="vertical" style={{width:500}}>
                <Form.Item
                    name={"VicePresident"}
                    label={"Vice President"}
                >
                    <Select placeholder={"Vice president"}>
                        <Select.Option value={"1"}>Najib Mehdi</Select.Option>
                        <Select.Option value={"2"}>Basma Guermah</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name={"Treasurer"}
                    label={"Treasurer"}
                    >
                    <Select placeholder={"Treasurer"}>
                        <Select.Option value={"1"}>Najib Mehdi</Select.Option>
                        <Select.Option value={"2"}>Basma Guermah</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name={"Secretary"}
                    label={"Secretary"}
                    >
                    <Select placeholder={"Secretary"}>
                        <Select.Option value={"1"}>Najib Mehdi</Select.Option>
                        <Select.Option value={"2"}>Basma Guermah</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Flex>
    );
};

const uploadProps: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const ThirdStepForm = () => {
    const [form] = Form.useForm();

    const validateEmail = (rule, value) => {
        if (!value) {
            return Promise.reject('Email is required');
        }
        // Add more custom validation rules for email if needed
        return Promise.resolve();
    };

    const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();

    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );


    return (
        <Flex style={{width: '100%', marginTop:24}} justify={'center'}>
            <Form form={form} layout="vertical" style={{width:500}}>
                <Form.Item name="logo" label="Logo" rules={[{ required: true, message: 'Logo URL is required' }]}>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        beforeUpload={beforeUpload}
                        onChange={handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>

                <Form.Item name="cover" label="Cover URL" rules={[{ required: true, message: 'Cover URL is required' }]}>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger>
                </Form.Item>

                <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Description is required' }]}>
                    <Input.TextArea placeholder="Enter Description" />
                </Form.Item>

                <Form.Item name="email" label="Email" rules={[{ validator: validateEmail }]}>
                    <Input placeholder="Enter Email" />
                </Form.Item>

                <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Phone is required' }]}>
                    <Input placeholder="Enter Phone" />
                </Form.Item>

                <Form.Item name="aboutUs" label="About Us" rules={[{ required: true, message: 'About Us is required' }]}>
                    <Input.TextArea placeholder="Enter About Us" />
                </Form.Item>

                <Form.Item name="upload" label="Upload Files">
                    <Upload beforeUpload={() => false} listType="text" maxCount={1}>
                        <Button icon={<UploadOutlined />}>Upload extra files</Button>
                    </Upload>
                </Form.Item>
            </Form>
        </Flex>
    );
}
