import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react'
import { Club, Student } from '../../../types';
import axios from "axios"
import {useQuery} from "@tanstack/react-query";


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
    title: 'Roles',
    dataIndex: 'roles',
    key: 'roles',
}
]


type Props = {}

export default function members(props: Props){
    const [pageNumber,setPageNumber] = useState<number>(0)
    const [pageSize,setPageSize]= useState<number>(3)
    const [totalRows, setTotalRows]= useState<number>(10)
    const [data,setdata] = useState<Student[]>([])

    const fetchClubMembers = (): Promise<Student[]> =>{
        return axios.get<Student[]>("http://localhost:8080/api/v1/clubs/2/members",{
            params:{
                pageNumber: pageNumber,
                pageSize: pageSize,
            
            }
        }
        
        ).then(res =>{
            console.log(res.data)
            console.log(res.headers['total-pages'])
            setTotalRows(pageSize*res.headers['total-pages'])
            setdata(res.data)
            return res.data
        }).catch(err =>{
            console.log(err)
            return []
        })
    }

    // const data = useQuery<Student[],Error>({
    //     queryKey:['members',pageNumber,pageSize],
    //     queryFn: fetchClubMembers,
    // })
    useEffect(
        ()=>{
            fetchClubMembers()
        },[]
    )
  return (
    <div>
        <Table 
                columns={columns}
                dataSource={data}
                //loading={data.isLoading}
                pagination={{
                    defaultPageSize: 10,
                    pageSize : pageSize,
                    current: pageNumber + 1,
                    total: totalRows,
                    pageSizeOptions: ['10', '25', '50'],
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                        setPageNumber(page)
                        setPageSize(pageSize)
                    }
                }}
            />
    </div>
  )
}