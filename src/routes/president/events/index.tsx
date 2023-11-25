import { Flex } from 'antd'
import React, { useState } from 'react'
import { Event } from '../../../types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import EventCard from './components/eventCard'

type Props = {}

function events({}: Props) {

    const [clubId,setClubId]= useState<number>(2)
    const [pageNumber,setPageNumber]= useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(25)

    const getEvents =():Promise<Event[]>=>{
        return axios.get(`http://localhost:8080/api/v1/clubs/${clubId}/events`,{
            params:{
                pageNumber: pageNumber-1,
                pageSize: pageSize
            }
        }).then(res =>{
            console.log("events:",res.data )
            return res.data
        }
        ).catch(err=> {
            console.error("can't fetch events",err)
            return []
        })
    }

    const events = useQuery<Event[],Error>({
        queryKey:['events',clubId,pageNumber,pageSize],
        queryFn: getEvents
    })

  return (
    <Flex gap="middle" wrap='wrap'>
        {events.data?.map((event)=>(
            <EventCard event={event} loading={false}/>
        ))}
    </Flex>
  )
}

export default events