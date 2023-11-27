import React, { } from 'react';
import { Avatar, Card, Divider, Flex, Image, List, Skeleton, Tag, Typography } from 'antd';
import { Event, Student } from '../../../../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { EditOutlined } from '@ant-design/icons';
import { render } from 'react-dom';
import getDaysLeft from '../../../../utils/days-left';
import InfiniteScroll from 'react-infinite-scroll-component';
import ParticipantsList from './participantsList';
import TransactionsList from './transactionsList';

const { Text } = Typography

const statusColors = {
    REQUESTED: 'blue',
    APPROVED: 'green',
    REJECTED: 'red',
    POST_EVENT: 'orange',
    CLOSED: 'purple',
};


const eventDetails: React.FC = () => {
    const { eventId } = useParams()

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
            <Card style={{ backgroundColor: 'transparent' }}>
                <h1>{event.data?.name}</h1>

                <Flex gap='middle' vertical>
                    <Image src={event.data?.cover} alt='event-cover' style={{ borderRadius: '10px' }} />
                    <Flex gap='middle' wrap='wrap'>

                        
                        <Card title='Details' style={{ height: 'fit-content', width: '500px' }} bordered={false} extra={<EditOutlined onClick={() => console.log('click')} />}>
                            {
                                items.map((item, index) => (
                                    <p key={index}>
                                        <Text type='secondary' >{item.label}:  </Text>
                                        <Text>{item.children}</Text>
                                    </p>
                                ))
                            }
                        </Card>

                        <ParticipantsList eventId={eventId} />
                        
                        <Card style={{ height: 'fit-content', width: 'fit-content' }} bordered={false}>
                            <Typography.Title level={1} style={{ display: 'inline' }}>
                                {
                                    event.data?.date ? getDaysLeft(event.data.date) : null
                                }
                            </Typography.Title>
                            <Typography.Text type='secondary'>Days left</Typography.Text>


                        </Card>
                        <TransactionsList eventId={eventId} />
                    </Flex>
                </Flex>
            </Card>
        </Flex>

    );
};

export default eventDetails;