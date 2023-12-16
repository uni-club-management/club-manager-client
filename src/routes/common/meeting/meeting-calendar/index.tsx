import type {Dayjs} from 'dayjs';
import {Avatar, Button, Calendar, Card, Collapse, Drawer, Flex, theme, Typography} from 'antd';
import {Meeting} from "../../../../types";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import dateFormat from "dateformat";
import {useSearchParams} from "react-router-dom";
import {AlignLeftOutlined, DashboardOutlined, EnvironmentOutlined, TeamOutlined} from "@ant-design/icons";
import CollapsePanel from "antd/es/collapse/CollapsePanel";

const MeetingCalendar = () => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [childrenDrawer, setChildrenDrawer] = React.useState<boolean>(false);
    const [selectedDate, setSelectedDate] = React.useState<string>("0")
    const [searchParams, setSearchParams] = useSearchParams({
        id: "",
    })
    const selectedMeeting = searchParams.get("id")


    const {
        token: {colorBgContainer},
    } = theme.useToken();

    // TODO : Change endpoint to meetings/me
    const fetchMeetings = (): Promise<Meeting[]> => {
        return axios.get<Meeting[]>("http://localhost:8080/api/v1/meetings").then(res => res.data)
    }

    const data = useQuery<Meeting[], Error>({
        queryKey: ['myMeetings'],
        queryFn: fetchMeetings,
    })


    return (
        <div style={{padding: 16, borderRadius: 6, background: colorBgContainer}}>
            <Calendar
                mode={"month"}
                cellRender={(date: Dayjs) => (
                    <>
                        {data.isSuccess && data.data.map((item) => {
                            if (date.toDate().setHours(0, 0, 0, 0).toString() == new Date(item!.date as Date).setHours(0, 0, 0, 0).toString()) {
                                return (
                                    <Flex gap={8} align={"center"} wrap={"wrap"}>
                                        <Typography.Title level={5} style={{margin: 0}}>{item.title}</Typography.Title>
                                        {item.description}
                                        <Avatar.Group maxCount={3}>
                                            {item!.participants!.map((student) => (
                                                <Avatar
                                                    src={`https://ui-avatars.com/api/?background=random&name=${student.firstName}+${student.lastName}`}
                                                />
                                            ))}
                                        </Avatar.Group>
                                    </Flex>
                                )
                            }
                        })}
                    </>
                )}
                onSelect={(date) => {
                    setSelectedDate(date.toDate().setHours(0, 0, 0, 0).toString())
                    setOpen(true)
                }}
            />
            <Drawer title={dateFormat(new Date(+selectedDate ?? 500), "mmmm d, yyyy")} placement="right"
                    onClose={() => setOpen(false)} open={open} extra={
                <Button type={"primary"}>Add new meeting</Button>
            }>
                <Flex gap={8} align={"center"} vertical style={{width: "100%"}}>
                    {data.isSuccess && data.data.map((item, key) => {
                        if (selectedDate == new Date(item!.date as Date).setHours(0, 0, 0, 0).toString()) {
                            return (
                                <Card
                                    style={{width: "100%"}}
                                    onClick={() => {
                                        setChildrenDrawer(true)
                                        setSearchParams(prev => {
                                            prev.set("id", `${key}`)
                                            return prev
                                        }, {replace: true})
                                    }}>
                                    <Flex gap={8} align={"center"} justify={"space-between"}>
                                        <Flex vertical gap={8}>
                                            <Typography.Title
                                                level={5}
                                                style={{margin: 0}}
                                            >
                                                {item.title}
                                            </Typography.Title>
                                            {item.description}
                                        </Flex>
                                        <Avatar.Group maxCount={3}>
                                            {item!.participants!.map((student) => (
                                                <Avatar
                                                    src={`https://ui-avatars.com/api/?background=random&name=${student.firstName}+${student.lastName}`}
                                                />
                                            ))}
                                        </Avatar.Group>
                                    </Flex>
                                </Card>
                            )
                        }
                    })}
                </Flex>
                <Drawer
                    open={childrenDrawer}
                    onClose={() => setChildrenDrawer(false)}
                    title={data.isSuccess && selectedMeeting &&
                        <Flex vertical gap={8}>
                            <Typography.Title level={4}
                                              style={{margin: 0}}>{data.data[+selectedMeeting].title}</Typography.Title>
                            <Typography.Text
                                type={"secondary"}>{dateFormat(data.data[+selectedMeeting].date as Date, "mmmm d, yyyy 'at' HH:MM")}</Typography.Text>
                        </Flex>
                    }
                >
                    {data.isSuccess && selectedMeeting &&
                        <Flex vertical gap={8}>
                            <Flex gap={8} align={"center"} style={{padding:"12px 0px"}}>
                                <EnvironmentOutlined style={{fontSize: 24}}/>
                                <Typography.Text
                                    style={{fontSize: 18}}>{data.data[+selectedMeeting].location}</Typography.Text>
                            </Flex>
                            <Collapse accordion bordered={false} expandIconPosition={"end"}
                                      style={{backgroundColor: "transparent", paddingLeft: 0}}>
                                <CollapsePanel
                                    style={{paddingLeft: 0, paddingRight: 0}}
                                    header={
                                        <Flex gap={8} align={"center"} style={{margin: "0px -16px"}}>
                                            <TeamOutlined style={{fontSize: 24}}/>
                                            <Typography.Text
                                                style={{fontSize: 18}}>{data.data[+selectedMeeting].participants?.length as number + 1} participants</Typography.Text>
                                        </Flex>
                                    }
                                    key={"1"}
                                >
                                    <Flex vertical gap={8}>
                                        <Flex gap={8} align={"center"} >
                                            <Avatar
                                                src={`https://ui-avatars.com/api/?background=random&name=${data.data[+selectedMeeting].organiser?.firstName}+${data.data[+selectedMeeting].organiser?.lastName}`}
                                            />
                                            <Flex gap={1} vertical align={"start"}>
                                                {data.data[+selectedMeeting].organiser?.firstName} {data.data[+selectedMeeting].organiser?.lastName}
                                                <Typography.Text type={"secondary"}>Organiser</Typography.Text>
                                            </Flex>
                                        </Flex>
                                        {data?.data[+selectedMeeting]?.participants?.map(participent => (
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
                                    style={{fontSize: 18}}>{data.data[+selectedMeeting].description}</Typography.Text>
                            </Flex>
                            <Flex gap={8} align={"center"} style={{padding:"12px 0px"}}>
                                <DashboardOutlined style={{fontSize: 24}}/>
                                <Typography.Text
                                    style={{fontSize: 18}}>{data.data[+selectedMeeting].lengthInMinutes} minutes</Typography.Text>
                            </Flex>
                        </Flex>
                    }
                </Drawer>
            </Drawer>
        </div>
    );
};

export default MeetingCalendar;