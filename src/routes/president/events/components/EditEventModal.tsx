import {Button, DatePicker, Flex, Form, Input, Modal, ModalProps, Select, Tag} from "antd";
import {Event, EventStatusEnum} from '../../../../types';
import React from "react";
import {useQueryClient} from "@tanstack/react-query";
import * as dayjs from "dayjs";

interface EventEditModalProps extends ModalProps {
    event: Event
}

type FormData = {
    title: string,
    description: string,
    Date: Date,
}
export const EditEventModalPresident = (props: EventEditModalProps) => {
    const [form] = Form.useForm();

    const close = React.useRef<any>();
    const queryClient = useQueryClient()

    function onFinish(values: FormData) {
        console.log({
            ...props.event,
            title: values.title,
            description: values.description,
            date: values.Date
        });
        queryClient.setQueryData(['event', props.event.idEvent], {
                ...props.event,
                title: values.title,
                description: values.description,
                date: values.Date
            }
        )
        form.resetFields()
        close.current!.click()
    }

    return (
        <Modal
            title={"Edit Event details"}
            footer={
                [
                    <Button key='submit' type='primary'
                            onClick={() => form.submit()}>submit</Button>,
                    <Button key='cancel' onClick={props.onCancel} ref={close}>cancel</Button>
                ]
            }
            {...props}
        >
            <Form
                style={{height: '100%'}}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
            >
                <Flex vertical justify={"space-between"} style={{height: '100%'}}>
                    <Form.Item name={"title"} label={"Title"}>
                        <Input defaultValue={props?.event?.name}/>
                    </Form.Item>
                    <Form.Item name={"description"} label={"Description"}>
                        <Input defaultValue={props?.event?.description}/>
                    </Form.Item>
                    <Form.Item name={"Date"} label={"Date"}>
                        <DatePicker defaultValue={dayjs(props?.event?.date)}/>
                    </Form.Item>
                </Flex>
            </Form>
        </Modal>
    );
};


type AdminFormData = {
    status: EventStatusEnum,
}

export const EditEventModalAdmin = (props: EventEditModalProps) => {
    const [form] = Form.useForm();
    const close = React.useRef<any>();
    const queryClient = useQueryClient()

    function onFinish(values: AdminFormData) {
        console.log({
            ...props.event,
            status: values.status
        });
        queryClient.setQueryData(['event', props.event.idEvent], {
                ...props.event,
                status: values.status
            }
        )
        form.resetFields()
        close.current!.click()
    }

    return (
        <Modal
            title={"Edit Event Status"}
            footer={
                [
                    <Button key='submit' type='primary'
                            onClick={() => form.submit()}>submit</Button>,
                    <Button key='cancel' onClick={props.onCancel} ref={close}>cancel</Button>
                ]
            }
            {...props}
        >
            <Form
                style={{height: '100%'}}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
            >
                <Flex vertical justify={"space-between"} style={{height: '100%'}}>

                    <Form.Item name={"status"} label={"Club status"}>
                        <Select
                            defaultValue={props?.event?.status}
                            options={[
                                {
                                    value: EventStatusEnum.APPROVED,
                                    label: <Tag color={"green"}>ACTIVE</Tag>
                                },
                                {
                                    value: EventStatusEnum.REQUESTED,
                                    label: <Tag color={"blue"}>REQUESTED</Tag>
                                },
                                {
                                    value: EventStatusEnum.REJECTED,
                                    label: <Tag color={"purple"}>REJECTED</Tag>
                                },
                                {
                                    value: EventStatusEnum.POSTEVENT,
                                    label: <Tag color={"orange"}>POST_EVENT</Tag>
                                },
                                {
                                    value: EventStatusEnum.CLOSED,
                                    label: <Tag color={"volcano"}>CLOSED</Tag>
                                },
                            ]}
                        />
                    </Form.Item>
                </Flex>
            </Form>
        </Modal>
    );
};
