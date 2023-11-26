import type {Dayjs} from 'dayjs';
import {Avatar,  Calendar,  Flex, theme, Typography} from 'antd';
import {Meeting} from "../../../../types";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import stc from "string-to-color"
const MeetingCalendar = () => {

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
                                    <Flex gap={8} align={"center"}>
                                        <Typography.Title level={5} style={{margin: 0}}>{item.title}</Typography.Title>
                                        {item.description}
                                        <Avatar.Group maxCount={3}>
                                            {item!.participants!.map((student) => (
                                                <Avatar style={{backgroundColor : stc(`${student.firstName} ${student.lastName}`)}}>
                                                    {student.firstName!.charAt(0).toUpperCase()}{student.lastName!.charAt(0).toUpperCase()}
                                                </Avatar>
                                            ))}
                                        </Avatar.Group>
                                    </Flex>
                                )
                            }
                        })}
                    </>
                )}
            />
        </div>
    );
};

export default MeetingCalendar;