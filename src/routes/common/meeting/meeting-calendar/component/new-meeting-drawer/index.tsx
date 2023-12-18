import {DrawerProps} from "antd/es/drawer";
import {Button, Drawer, Flex, Form, Input, Select, TimePicker, Typography} from "antd";
import dateFormat from "dateformat";
import React from "react";
import  {Dayjs} from 'dayjs';
import {NewMeetingRequest, Student} from "../../../../../../types";
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import { CompoundedComponent } from "antd/es/float-button/interface";


interface Props extends DrawerProps {
    date: string
}

type FormData = {
    title: string,
    description: string,
    location: string,
    participants: number[],
    timeRange: [Dayjs,Dayjs]
}

const NewMeetingDrawer = (props: Props) => {

    const [searchText, setSearchText] = React.useState<string>("");
    const close = React.useRef<any>();
    const [form] = Form.useForm();
    const queryClient = useQueryClient();

    const chosenDateTime= new Date(+props.date);

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({note: 'Hi, man!'});
                break;
            case 'female':
                form.setFieldsValue({note: 'Hi, lady!'});
                break;
            case 'other':
                form.setFieldsValue({note: 'Hi there!'});
                break;
            default:
        }
    };

    const onFinish = (values: FormData) => {
        mutation.mutate({
            title: values.title,
            description: values.description,
            location: values.location,
            date: new Date(chosenDateTime.setHours(values.timeRange[0].hour(),values.timeRange[0].minute(),0,0)),
            lengthInMinutes: values.timeRange[1].diff(values.timeRange[0],"minutes"),
            participantsIds: values.participants
        });
    };



    const searchStudents = (): Promise<Student[]> => {
        return axios.get<Student[]>("http://localhost:8080/api/v1/students", {
            params: {
                pageNumber: 0,
                pageSize: 15,
                search: searchText,
            }
        }).then(res => res.data)
    }

    const data = useQuery<Student[], Error>({
        queryKey: ['studentSearch', searchText],
        queryFn: searchStudents,
    })

    const mutation = useMutation({
        mutationFn: (body : NewMeetingRequest) => {
            return axios.post("http://localhost:8080/api/v1/meetings",body)
        },
        onSuccess:() => {
            queryClient.refetchQueries({queryKey:['myMeetings']})
        },
        onSettled:()=>{
            form.resetFields();
            close.current?.click()
        }
    })


    return (
        <Drawer
            title={
                <Typography.Title level={4} style={{margin: 0}}>Create New Meeting
                    for {dateFormat(chosenDateTime, 'mmmm d, yyyy')}</Typography.Title>}
            {...props}
        >
            <Form
                layout={"vertical"}
                style={{height: '100%'}}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
            >
                <Flex vertical justify={"space-between"} style={{height: '100%'}}>
                    <>
                        <Form.Item name="title" label="Title" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="description" label="Description" rules={[{required: true}]}>
                            <Input.TextArea/>
                        </Form.Item>
                        <Form.Item name="location" label="location" rules={[{required: true}]}>
                            <Input/>
                        </Form.Item>
                        <Form.Item name="participants" label="Participants" rules={[{required: true}]}>
                            <Select
                                showSearch
                                placeholder="Select a option and change input text above"
                                onChange={onGenderChange}
                                filterOption={false}
                                mode="multiple"
                                allowClear  
                                loading={data.isLoading}
                                onSearch={(value) => setSearchText(value)}
                            >
                                {data.isSuccess && data.data.map((student) => (
                                    <Select.Option
                                        value={student.idA}>{student.lastName} {student.firstName}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item name="timeRange" label="Time" rules={[{required: true}]}>
                            <TimePicker.RangePicker format={'HH:mm'} style={{width: "100%"}}/>
                        </Form.Item>
                    </>
                    <Form.Item style={{marginTop: "auto"}}>
                        <Flex justify={"end"} gap={12}>
                            <Button type="primary" htmlType="submit" loading={mutation.isPending}>
                                Submit
                            </Button>
                            <Button htmlType="button" ref={close} onClick={props.onClose}>
                                cancel
                            </Button>
                        </Flex>
                    </Form.Item>
                </Flex>
            </Form>
        </Drawer>
    );
};

export default NewMeetingDrawer;