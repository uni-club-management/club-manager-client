import axios from 'axios'
import React, { useState } from 'react'
import { Club, Student } from '../../../../types'
import { useQuery } from '@tanstack/react-query'

type Props = {}
const CommitteeMembers = (props: Props) => {
   const [clubId,setClubId] = useState<number>(2)
    let committeeMembers : Student[] = []

   const getClub = async ():Promise<Club> =>{
    return await axios.get(`http://localhost:8080/api/v1/clubs/${clubId}`).then(
        (res =>{
            return res.data
        })
    ).catch(err=>{
        console.error('error fetching club data',err)
    })
   }

    const club = useQuery<Club,Error>({
        queryKey: ['club',clubId],
        queryFn: getClub
    })

    if(club.isLoading){
        return <div>Loading...</div>
    }else if (club.isError){
        return <div>Error : {club.error?.message}</div>
    }else if (club.data){
        committeeMembers = club.data.committeeMembers as Student[]
    }


    return (
        <div>
            <h2>Committee Members</h2>
            <ul>
                {committeeMembers.map((member) => (
                    <li key={member.idA}>{member.email}</li>
                ))}
            </ul>
        </div>
    )
}

export default CommitteeMembers
