import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Card, Typography } from 'antd';
interface Props {
    idClub: number|"";
    }
const  BarChart = ({idClub}:Props) => {

      const countApprouvedEvents = useQuery<number, Error>({
    queryKey: ["countEvents", idClub, "APPROVED"],
    queryFn: () =>
      axios
    .get(`http://localhost:8080/api/v1/events/${idClub}/count`,{
      params: {
        status: "APPROVED",
      }
    }).then((res) => res.data),
  });

  const countPendingEvents = useQuery<number, Error>({
    queryKey: ["countEvents", idClub, "REQUESTED"],
    queryFn: () =>
      axios
    .get(`http://localhost:8080/api/v1/events/${2}/count`,{
      params: {
        status: "REQUESTED",
      }
    }).then((res) => res.data),
  });

  const countRejectedEvents = useQuery<number, Error>({
    queryKey: ["countEvents", idClub, "REJECTED"],
    queryFn: () =>
      axios
    .get(`http://localhost:8080/api/v1/events/${idClub}/count`,{
      params: {
        status: "REJECTED",
      }
    }).then((res) => res.data),
  });

  const countPostEventEvents = useQuery<number, Error>({
    queryKey: ["countEvents", idClub, "POST_EVENT"],
    queryFn: () =>
      axios
    .get(`http://localhost:8080/api/v1/events/${idClub}/count`,{
      params: {
        status: "POST_EVENT",
      }
    }).then((res) => res.data),
  });

  const countClosedEvents = useQuery<number, Error>({
    queryKey: ["countEvents", idClub, "CLOSED"],
    queryFn: () =>
      axios
    .get(`http://localhost:8080/api/v1/events/${idClub}/count`,{
      params: {
        status: "CLOSED",
      }
    }).then((res) => res.data),
  });   
  const countEvents = useQuery<number, Error>({
    queryKey: ["countEvents", idClub],
    queryFn: () =>
      axios
        .get(`http://localhost:8080/api/v1/events/${idClub}/count`)
        .then((res) => res.data),
  });
  const data = [
    {
      status: 'APPROVED',
      count: countApprouvedEvents.data,
    },
    {
      status: 'REQUESTED',
      count: countPendingEvents.data,
    },
    {
        status: 'ALL',
        count: countEvents.data,
    },
    {
      status: 'REJECTED',
      count: countRejectedEvents.data,
    },
    {
      status: 'POST_EVENT',
      count: countPostEventEvents.data,
    },
    {
      status: 'CLOSED',
      count: countClosedEvents.data,
    },
  ];
  const config = {
    data,
    xField: 'status',
    yField: 'count',
    label: {
      position: 'top', // 'top', 'bottom', 'middle
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    
    
  };
  return(
<Card style={{width:"400px",  height:"fit-content"}}>
    <Typography.Title level={4}>Events by status</Typography.Title>
    <Column {...config} height={300} width={400}/>
  </Card>
  )
  
};

export default BarChart;