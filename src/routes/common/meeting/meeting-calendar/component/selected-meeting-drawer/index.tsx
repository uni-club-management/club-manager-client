import {DrawerProps} from "antd/es/drawer";
import {AuthenticationResponseRolesEnum, Meeting} from "../../../../../../types";
import {Avatar, Button, Collapse, Drawer, Flex, Popconfirm, Typography} from "antd";
import dateFormat from "dateformat";
import {AlignLeftOutlined, DashboardOutlined, EnvironmentOutlined, TeamOutlined} from "@ant-design/icons";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../../../../../context";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "react-toastify";
import NewMeetingDrawer from "../new-meeting-drawer";
import * as dayjs from 'dayjs'
interface Props extends DrawerProps {
    meeting: Meeting
}
const SelectedMeetingDrawer = (props: Props) => {
    return (
        <Drawer
            title={
                <Flex vertical gap={8}>
                    <Typography.Title level={4}
                                      style={{margin: 0}}>{props.meeting.title}</Typography.Title>
                    <Typography.Text
                        type={"secondary"}>{dateFormat(props.meeting.date as Date, "mmmm d, yyyy 'at' HH:MM")}</Typography.Text>
                </Flex>
            }
            footer={
                <MeetingDrawerFooter meeting={props.meeting} onClose={props.onClose}/>
            }
            {...props}
        >
            <Flex vertical gap={8}>
                <Flex gap={8} align={"center"} style={{padding:"12px 0px"}}>
                    <EnvironmentOutlined style={{fontSize: 24}}/>
                    <Typography.Text
                        style={{fontSize: 18}}>{props.meeting.location}</Typography.Text>
                </Flex>
                <Collapse accordion bordered={false} expandIconPosition={"end"}
                          style={{backgroundColor: "transparent", paddingLeft: 0}}>
                    <CollapsePanel
                        style={{paddingLeft: 0, paddingRight: 0}}
                        header={
                            <Flex gap={8} align={"center"} style={{margin: "0px -16px"}}>
                                <TeamOutlined style={{fontSize: 24}}/>
                                <Typography.Text
                                    style={{fontSize: 18}}>{props.meeting.participants?.length as number + 1} participants</Typography.Text>
                            </Flex>
                        }
                        key={"1"}
                    >
                        <Flex vertical gap={8}>
                            <Flex gap={8} align={"center"} >
                                <Avatar
                                    src={`https://ui-avatars.com/api/?background=random&name=${props.meeting.organiser?.firstName}+${props.meeting.organiser?.lastName}`}
                                />
                                <Flex gap={1} vertical align={"start"}>
                                    {props.meeting.organiser?.firstName} {props.meeting.organiser?.lastName}
                                    <Typography.Text type={"secondary"}>Organiser</Typography.Text>
                                </Flex>
                            </Flex>
                            {props.meeting?.participants?.map(participent => (
                                <Flex gap={8} align={"center"} >
                                    <Avatar
                                        src={`https://ui-avatars.com/api/?background=random&name=${participent.firstName}+${participent.lastName}`}
                                    />
                                    {participent.firstName} {participent.lastName}
                                </Flex>
                            ))}
                        </Flex>
                    </CollapsePanel>
                </Collapse>
                <Flex gap={8} align={"center"} style={{padding:"12px 0px"}}>
                    <AlignLeftOutlined style={{fontSize: 24}}/>
                    <Typography.Text
                        style={{fontSize: 18}}>{props.meeting.description}</Typography.Text>
                </Flex>
                <Flex gap={8} align={"center"} style={{padding:"12px 0px"}}>
                    <DashboardOutlined style={{fontSize: 24}}/>
                    <Typography.Text
                        style={{fontSize: 18}}>{props.meeting.lengthInMinutes} minutes</Typography.Text>
                </Flex>
            </Flex>
        </Drawer>
    );
};

export default SelectedMeetingDrawer;




type DrawerFooterProps = {
    meeting: Meeting,
    onClose :  ((e: (React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>)) => void) | undefined
}

const MeetingDrawerFooter = (props: DrawerFooterProps) => {

    const {user} = useContext(AuthContext);
    const queryClient = useQueryClient()
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const mutation = useMutation({
        mutationFn: () => {
            return axios.delete(`http://localhost:8080/api/v1/meetings/${props.meeting.idM}`)
        },
        onSuccess: () => {

            queryClient.refetchQueries({queryKey: ['myMeetings']}).then(() => {
                toast.success('meeting deleted successfully', {
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
    })

    if (user && (!user.roles?.includes(AuthenticationResponseRolesEnum.ADMIN) && !user.roles?.includes(AuthenticationResponseRolesEnum.PROF)))
        return null;

    return (
        <Flex gap={8} justify={"space-between"} align={"center"}>
            <Popconfirm
                title="Delete the meeting"
                description="Are you sure to delete this task?"
                onConfirm={() => mutation.mutate()}
                onPopupClick={props.onClose}
                okText="Yes"
                cancelText="No"
            >
                <Button danger loading={mutation.isPending}>Delete</Button>
            </Popconfirm>
            <NewMeetingDrawer
                date={dayjs(props.meeting.date).toDate().setHours(0, 0, 0, 0).toString()}
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </Flex>
    );
};
