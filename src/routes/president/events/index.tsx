import { Flex, Select } from 'antd'
import React, { useState } from 'react'
import { Event, EventStatusEnum } from '../../../types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import EventCard from './components/eventCard'
import Search from 'antd/es/input/Search'

type Props = {}

function events({}: Props) {

    const [clubId,setClubId]= useState<number>(2)
    const [pageNumber,setPageNumber]= useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(25)

    const [search, setSearch] = useState<string>("")
    const [status, setStatus] = useState<string>("")

    const getEvents =():Promise<Event[]>=>{
        return axios.get(`http://localhost:8080/api/v1/clubs/${clubId}/events`,{
            params:{
                pageNumber: pageNumber-1,
                pageSize: pageSize,
                search:search,
                status:status

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
        queryKey:['events',clubId,pageNumber,pageSize,search,status],
        queryFn: getEvents
    })

   
    const onSelectStatus = (value:string)=>{
        setStatus(value)
    }
  return (
    <>
    <Flex style={{marginBottom:'20px'}} gap="large">
        <Select size='large' placeholder="Status" onChange={e => onSelectStatus(e)} style={{width:'10rem'}} options={[{value:'',label:'ALL'},{value:'REQUESTED'},{value:'APPROVED'},{value:'REJECTED'},{value:'POST_EVENT'},{value:'CLOSED'}]} loading={events.isLoading}/>
    </Flex>
    <Flex gap="middle" wrap='wrap'>
        {events.data?.map((event)=>(
            <EventCard event={event} loading={false}/>
        ))}
    </Flex>
    </>
    
  )
}

export default events