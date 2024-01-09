import {Button, Flex, Form, Modal, ModalProps, Select, Switch, Tag} from "antd";
import {Club, NewClubRequestStatusEnum, NewClubRequest} from "../../../../../../types";
import axios from "axios";
import {useParams} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import React from "react";
import {toast} from "react-toastify";

interface Props extends ModalProps {
    club: Club | undefined
}

type FormData = {
    status: NewClubRequestStatusEnum,
    featured: boolean
}

const ClubEditModal = (props: Props) => {

    const {clubId} = useParams();
    const [form] = Form.useForm();
    const queryClient = useQueryClient()
    const close = React.useRef<any>();

    const mutation = useMutation({
        mutationFn: (body: NewClubRequest) => {
            return axios.put<Club>(`http://localhost:8080/api/v1/clubs/${clubId}`, body).then(res => res.data)
        },
        onSuccess: () => {
            form.resetFields;
            queryClient.refetchQueries({queryKey: ['clubInfo', clubId]}).then(() => {
                toast.success('Club updated successfully', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
        },
        onError: () => {
            toast.error('A problem occurred', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        },
        onSettled: () => {
            props.onCancel;
            close!.current!.click()
        }
    })


    const onFinish = (values: FormData) => {
        mutation.mutate({
            status: values.status,
            featured: values.featured
        });
    };

    return (
        <Modal
            title={"Edit club details"}
            footer={
                [
                    <Button key='submit' type='primary'
                            loading={mutation.isPending}
                            onClick={()=> form.submit()}>submit</Button>,
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
                    <>
                        <Form.Item name={"status"} label={"Club status"}>
                            <Select
                                defaultValue={props?.club?.status}
                                options={[
                                    {
                                        value: NewClubRequestStatusEnum.ACTIVE,
                                        label: <Tag color={"green"}>ACTIVE</Tag>
                                    },
                                    {
                                        value: NewClubRequestStatusEnum.CREATIONSTEP1,
                                        label: <Tag color={"orange"}>CREATION_STEP_1</Tag>
                                    },
                                    {
                                        value: NewClubRequestStatusEnum.CREATIONSTEP2,
                                        label: <Tag color={"purple"}>CREATION_STEP_2</Tag>
                                    },
                                    {
                                        value: NewClubRequestStatusEnum.CREATIONSTEP3,
                                        label: <Tag color={"blue"}>CREATION_STEP_3</Tag>
                                    },
                                    {
                                        value: NewClubRequestStatusEnum.ABANDONED,
                                        label: <Tag color={"volcano"}>ABANDONED</Tag>
                                    },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item name="featured" label="Is club featured">
                            <Switch defaultChecked={props?.club?.featured}/>
                        </Form.Item>
                    </>
                </Flex>
            </Form>
        </Modal>
    );
};

export default ClubEditModal;