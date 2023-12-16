import {Button, Divider, Flex, Select, Typography} from 'antd'
import React from 'react'
import {Event} from '../../../types'
import axios from 'axios'
import {useInfiniteQuery} from '@tanstack/react-query'
import EventCard from './components/eventCard'
import Search from 'antd/es/input/Search'
import {useParams} from "react-router-dom";
import {ClubContext} from "../../../context";


function ClubEvents() {

    const {clubId} = useParams();
    const club = React.useContext(ClubContext)
    const idClub = (clubId && +clubId) ?? club.clubId ?? 0
    const [totalPages, setTotalPages] = React.useState<number>(1)
    const pageNumber = React.useRef<number>(1)
    console.log(club)

    const [search, setSearch] = React.useState<string>("")
    const [status, setStatus] = React.useState<string>("")

    // eslint-disable-next-line
    // @ts-ignore
    const getEvents = ({pageParam}): Promise<Event[]> => {
        return axios.get(`http://localhost:8080/api/v1/clubs/${idClub}/events`, {
            params: {
                pageNumber: pageParam,
                pageSize: 10,
                search: search,
                status: status

            }
        }).then(res => {
                console.log("events:", res.data)
                setTotalPages(res.headers['total-pages'])
                return res.data
            }
        ).catch(err => {
            console.error("can't fetch events", err)
            return []
        })
    }

    const events = useInfiniteQuery<Event[], Error>({
        queryKey: ['events', idClub, search, status],
        queryFn: getEvents,
        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages, lastPageParam) => {
            // eslint-disable-next-line
            // @ts-ignore
            if (lastPageParam < totalPages-1) {
                // eslint-disable-next-line
                // @ts-ignore
                return lastPageParam + 1
            }
            return undefined
        }
    })

    const onSearch = (value: string) => {
        setSearch(value)
        pageNumber.current = 1;
    }
    const onSelectStatus = (value: string) => {
        setStatus(value);
        pageNumber.current = 1;
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
                {
                    events.data?.pages.map((page) => (
                        page.map((event) => (
                            <EventCard event={event} loading={events.isLoading}/>
                        ))
                    ))
                }                
            </Flex>
            {
                events.hasNextPage ? (
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: 10,
                            marginBottom: 6,
                            height: 32,
                            lineHeight: '32px',
                        }}
                    >
                        <p><Typography.Text>page {pageNumber.current}/{totalPages}</Typography.Text></p>
                        <Button loading={events.isFetchingNextPage} 
                                onClick={()=> {
                                    events.fetchNextPage();
                                    pageNumber.current++;
                                    }}>show more</Button>
                    </div>
                ) : <Divider plain>It is all, nothing more 🤐</Divider>
            }
        </>

    )
}

export default ClubEvents