import { Card, Table, Tag } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react'
import { Club, Student } from '../../../../types';
import axios from "axios"
import {useQuery} from "@tanstack/react-query";
import { ExportOutlined } from '@ant-design/icons';

//TODO: implement card's export action

const columns : ColumnsType<Student> = [{
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
},
{
    title: 'Last Name',    
    dataIndex: 'lastName',
    key: 'lastName',
},
{
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
},
{
    title: 'Major',
    dataIndex: 'major',
    key: 'major',
},
{
    title:'Role',
    dataIndex: 'roles',
    key:'role',
    
}
]


type Props = {}

export default function membersTable(props: Props){
    const [pageNumber,setPageNumber] = useState<number>(1)
    const [pageSize,setPageSize]= useState<number>(3)
    const [totalRows, setTotalRows]= useState<number>(30)

    const getClubMembers = (): Promise<Student[]> =>{
        return axios.get<Student[]>("http://localhost:8080/api/v1/clubs/2/members",{
            params:{
                pageNumber: pageNumber-1,
                pageSize: pageSize,
            
            }
        }
        
        ).then(res =>{
            setTotalRows(pageSize*res.headers['total-pages'])
            console.log(res.data)
            return res.data
        }).catch(err =>{
            console.log(err)
            return []
        })
    }

    const data = useQuery<Student[],Error>({
        queryKey:['members',pageNumber,pageSize],
        queryFn: getClubMembers,
    })
  
  return (
        <Card 
        title="All Members"
        extra={<ExportOutlined/>}
        style={{marginTop:'20px'}}
        >
        <Table 
                columns={columns}
                dataSource={data.data}
                loading={data.isLoading}
                pagination={{
                    defaultPageSize: 10,
                    pageSize : pageSize,
                    current: pageNumber,
                    total: totalRows,
                    pageSizeOptions: ['10', '25', '50'],
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                        setPageNumber(page)
                        setPageSize(pageSize)
                    }
                }}
            />
        </Card>
        
  )
}