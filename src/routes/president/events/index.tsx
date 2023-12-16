import {Flex, Select} from 'antd'
import React from 'react'
import {Event} from '../../../types'
import axios from 'axios'
import {useQuery} from '@tanstack/react-query'
import EventCard from './components/eventCard'
import Search from 'antd/es/input/Search'
import {useParams} from "react-router-dom";
import {ClubContext} from "../../../context";


function ClubEvents() {

    const {clubId} = useParams();
    const club = React.useContext(ClubContext)
    const idClub = (clubId && +clubId) ?? club.clubId ?? 0

    console.log(club)

    const [search, setSearch] = React.useState<string>("")
    const [status, setStatus] = React.useState<string>("")

    const getEvents = (): Promise<Event[]> => {
        return axios.get(`http://localhost:8080/api/v1/clubs/${idClub}/events`, {
            params: {
                pageNumber: 0,
                pageSize: 100,
                search: search,
                status: status

            }
        }).then(res => {
                console.log("events:", res.data)
                return res.data
            }
        ).catch(err => {
            console.error("can't fetch events", err)
            return []
        })
    }

    const events = useQuery<Event[], Error>({
        queryKey: ['events', clubId, search, status],
        queryFn: getEvents
    })

    const onSearch = (value: string) => {
        setSearch(value)
    }
    const onSelectStatus = (value: string) => {
        setStatus(value)
    }
    return (
        <>
            <Flex style={{marginBottom: '20px'}} gap="large">
                <Select size='large' placeholder="Status" onChange={e => onSelectStatus(e)} style={{width: '10rem'}}
                        options={[{
                            value: '',
                            label: 'ALL'
                        }, {value: 'REQUESTED'}, {value: 'APPROVED'}, {value: 'REJECTED'}, {value: 'POST_EVENT'}, {value: 'CLOSED'}]}
                        loading={events.isLoading}/>
                <Search size='large' placeholder="Search Events" onChange={e => onSearch(e.target.value)}
                        style={{width: "300px"}} loading={events.isLoading}/>
            </Flex>
            <Flex gap="middle" wrap='wrap'>
                {events.data?.map((event) => (
                    <EventCard event={event} loading={false}/>
                ))}
            </Flex>
        </>

    )
}

export default ClubEvents