import { Card, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { Budget, Event, Transaction } from '../../../../types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ColumnsType } from 'antd/es/table'

const columns : ColumnsType<Transaction> = [
    {
    title: 'Event',
    dataIndex: 'event',
    key: 'event',
    render: (event : Event)=> event.name
    },
    
    {
        title: 'amount',
        dataIndex: 'valeur',
        key: 'amount'
    },
    
    {
        title: 'Documents',
        dataIndex: 'preuve',
        key: 'docs'
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (date: Date) => new Date(date).toLocaleDateString()
    },
    {
        title:'Status',
        dataIndex:'isValide',
        key:'isValide',
        render: (valide : boolean)=> (
            <Tag color={valide?'green':'red'}>{valide?'approved':'rejected'}</Tag>
        )
    }
   
]

type Props = {
    budget: Budget
}

const budgetTransactions = ({budget}: Props) => {
    const [pageNumber,setPageNumber] = useState<number>(1)
    const [pageSize,setPageSize] = useState<number>(4)
    const [totalRows, setTotalRows]= useState<number>(0)

    const getTransactions = async ():Promise<Transaction[]> =>{
        return await axios.get(`http://localhost:8080/api/v1/budgets/${budget.idBudget}/transactions`,{
            params:{
                pageNumber: pageNumber-1,
                pageSize: pageSize
            }
        }).then(res =>{
            console.log('transactions:',res.data.content)
            setTotalRows(res.data.totalPages * pageSize)
            return res.data.content
        }
        ).catch((err)=>{
            console.error("can't fetch transactions")
            throw err
        })
    }

    const transactions = useQuery<Transaction[],Error>({
        queryKey:['transactions',budget.idBudget,pageNumber,pageSize],
        queryFn: getTransactions
    })

  return (
    <Card title='Transactions History' style={{width:'100%'}} >
        <Table
            //scroll

            columns={columns}
            dataSource={transactions.data}
            loading={transactions.isLoading}
            pagination={{
                defaultPageSize:5,
                pageSize: pageSize,
                current: pageNumber,
                total: totalRows,
                pageSizeOptions:['4','10','25'],
                showSizeChanger: true,
                onChange: (pageNumber, pageSize)=>{
                    setPageNumber(pageNumber)
                    setPageSize(pageSize)
                }
            }}
        />

    </Card>   
  )
}

export default budgetTransactions