import React from 'react'
import { useParams } from 'react-router-dom';
import {ClubContext} from "../../../context";
import { useMutation, useQuery } from '@tanstack/react-query';
import { ClubDetails } from '../../../types';
import axios from 'axios';
import { Card, Flex, Image } from 'antd';

type Props = {}

const Dashboard = (props: Props) => {
    const {clubId} = useParams();
    const club = React.useContext(ClubContext)
    const idClub = (clubId && +clubId) ?? club.clubId ?? 0

    const getClubDetails = ()=>{
        
    }
    const clubDetails = useQuery<ClubDetails,Error>({
        queryKey:["clubDetails",idClub],
        queryFn:()=>axios.get(`http://localhost:8080/api/v1/clubs/${idClub}/details`),
        
    }
    )
    

  return (
    <Card>
        <Flex>
            <Image src={clubDetails.data?.cover}/>
            
        </Flex>
    </Card>
  )
}

export default Dashboard