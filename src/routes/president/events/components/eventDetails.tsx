import React, {useContext, useState} from 'react';
import {Card, Divider, Flex, Image, Tag, Typography} from 'antd';
import {AuthenticationResponseRolesEnum, Event} from '../../../../types';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {EditOutlined} from '@ant-design/icons';
import getDaysLeft from '../../../../utils/days-left';
import ParticipantsList from './participantsList';
import TransactionsList from './transactionsList';
import {AuthContext} from "../../../../context";
import {EditEventModalAdmin, EditEventModalPresident} from "./EditEventModal.tsx";

const {Text} = Typography

const statusColors = {
    REQUESTED: 'blue',
    APPROVED: 'green',
    REJECTED: 'red',
    POST_EVENT: 'orange',
    CLOSED: 'purple',
};


const EventDetails: React.FC = () => {
    const {eventId} = useParams()
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
    const {user} = useContext(AuthContext);
    const getEvent = async (): Promise<Event> => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/events/${eventId}`);
            console.log("event:", res.data);
            return res.data;
        } catch (err) {
            console.error("can't fetch event", err);
            throw err;
        }
    }


    const event = useQuery<Event, Error>({
        queryKey: ['event', eventId],
        queryFn: getEvent
    })


    const items = [
        {
            label: 'Title',
            children: event.data?.name
        },
        {
            label: 'Description',
            children: event.data?.description
        },
        {
            label: 'Status',
            children: event.data?.status ? <Tag color={statusColors[event.data.status]}>{event.data.status}</Tag> : null
        },
        {
            label: 'Date',
            children: event.data?.date ? new Date(event.data.date).toLocaleDateString() : null
        },


    ]

    return (
        <Flex vertical>
            <Card style={{backgroundColor: 'transparent'}}>
                <h1>{event.data?.name}</h1>

                <Flex gap='middle' vertical>
                    <Image src={event.data?.cover} alt='event-cover' style={{borderRadius: '10px'}}/>
                    <Flex justify={"space-between"}>


                        <Card
                            title='Details'
                            style={{width: '500px'}}
                            bordered={false}
                            extra={<EditOutlined onClick={() => {
                                if (user?.roles?.includes(AuthenticationResponseRolesEnum.ADMIN)
                                    || user?.roles?.includes(AuthenticationResponseRolesEnum.PROF)
                                ) {
                                    setShowAdminModal(true)
                                } else {
                                    setShowModal(true)
                                }
                            }}/>}
                        >
                            {
                                items.map((item, index) => (
                                    <p key={index}>
                                        <Text type='secondary'>{item.label}: </Text>
                                        <Text>{item.children}</Text>
                                    </p>
                                ))
                            }
                            <Divider/>
                            <Typography.Title level={1} style={{display: 'inline'}}>
                                {
                                    event.data?.date ? getDaysLeft(event.data.date) : null
                                }
                            </Typography.Title>
                            <Typography.Text type='secondary'>Days left</Typography.Text>
                        </Card>
                        <ParticipantsList eventId={eventId}/>
                        <TransactionsList eventId={eventId as string}/>
                        {event.isSuccess &&
                            <>
                                <EditEventModalPresident event={event.data} open={showModal} onCancel={() => setShowModal(false)}/>
                                <EditEventModalAdmin event={event.data} open={showAdminModal} onCancel={() => setShowAdminModal(false)}/>
                            </>
                        }
                    </Flex>
                </Flex>
            </Card>
        </Flex>

    );
};

export default EventDetails;