import {DrawerProps} from "antd/es/drawer";
import {Meeting} from "../../../../../../types";
import {Avatar, Collapse, Drawer, Flex, Typography} from "antd";
import dateFormat from "dateformat";
import {AlignLeftOutlined, DashboardOutlined, EnvironmentOutlined, TeamOutlined} from "@ant-design/icons";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

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