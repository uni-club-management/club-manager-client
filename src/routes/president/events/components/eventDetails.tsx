import React, { useEffect, useState } from 'react';
import { Button, Flex, Modal } from 'antd';
import { Event } from '../../../../types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



const eventDetails: React.FC = () => {
    const {eventId} = useParams() 

    const getEvent = ():Promise<Event> => {
        return axios.get(`http://localhost:8080/api/v1/events/${eventId}`)
            .then(res => {
                console.log("event:", res.data)
                return res.data
            }
            ).catch(err => {
                console.error("can't fetch event", err)
                return []
            })
    }

    const event = useQuery<Event, Error>({
        queryKey: ['event', eventId],
        queryFn: getEvent
    })
  return (
    <Flex vertical>
        <img src={event.data?.cover} alt="event image"/>
    </Flex>
  );
};

export default eventDetails;