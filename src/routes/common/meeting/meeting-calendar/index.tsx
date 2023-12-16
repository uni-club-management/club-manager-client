import type {Dayjs} from 'dayjs';
import {Avatar, Button, Calendar, Card, Drawer, Flex, theme, Typography} from 'antd';
import {AuthenticationResponseRolesEnum, Meeting} from "../../../../types";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import React, {useContext} from "react";
import dateFormat from "dateformat";
import {useSearchParams} from "react-router-dom";
import {AuthContext} from "../../../../context/AuthContext.tsx";
import SelectedMeetingDrawer from "./component/selected-meeting-drawer";

const MeetingCalendar = () => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [isSelectedMeetingDrawerOpen, setIsSelectedMeetingDrawerOpen] = React.useState<boolean>(false);
    const [selectedDate, setSelectedDate] = React.useState<string>("0")
    const [searchParams, setSearchParams] = useSearchParams({
        id: "",
    })
    const selectedMeeting = searchParams.get("id")
    const {user} = useContext(AuthContext)


    const {
        token: {colorBgContainer},
    } = theme.useToken();

    const fetchMeetings = (): Promise<Meeting[]> => {
        return axios.get<Meeting[]>("http://localhost:8080/api/v1/meetings/me").then(res => res.data)
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
                user && (user.roles?.includes(AuthenticationResponseRolesEnum.ADMIN) || user.roles?.includes(AuthenticationResponseRolesEnum.PROF)) &&
                <Button type={"primary"}>Add new meeting</Button>
            }>
                <Flex gap={8} align={"center"} vertical style={{width: "100%"}}>
                    {data.isSuccess && data.data.map((item, key) => {
                        if (selectedDate == new Date(item!.date as Date).setHours(0, 0, 0, 0).toString()) {
                            return (
                                <Card
                                    style={{width: "100%"}}
                                    onClick={() => {
                                        setIsSelectedMeetingDrawerOpen(true)
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
                <SelectedMeetingDrawer
                    meeting={data!.data![+!selectedMeeting]}
                    open={isSelectedMeetingDrawerOpen}
                    onClose={() => setIsSelectedMeetingDrawerOpen(false)}
                />

            </Drawer>
        </div>
    );
};

export default MeetingCalendar;