import { Button, Card, Form, Modal, Popconfirm, Table, Tag } from 'antd'
import React, { useState } from 'react'
import { Budget, Event, Transaction } from '../../../../types'
import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ColumnsType } from 'antd/es/table'
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons'
import NewTransactionModal from './newTransactionForm'



type Props = {
    budget: Budget
}

const budgetTransactions = ({budget}: Props) => {
    const [pageNumber,setPageNumber] = useState<number>(1)
    const [pageSize,setPageSize] = useState<number>(4)
    const [totalRows, setTotalRows]= useState<number>(0)

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const getTransactions = async ():Promise<Transaction[]> =>{
        return await axios.get(`http://localhost:8080/api/v1/budgets/${budget.idBudget}/transactions`,{
            params:{
                pageNumber: pageNumber-1,
                pageSize: pageSize
            }
        }).then(res =>{
            console.log('transactions:',res.data)
            setTotalRows(res.headers["total-pages"] * pageSize)
            return res.data
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
       
        const deleteTransaction = useMutation({
            mutationFn: (id:number|undefined):Promise<any> =>{
                return axios.delete(`http://localhost:8080/api/v1/transactions/${id}`)
            },
            onSuccess: ()=>{
                console.log('transaction deleted')
                transactions.refetch()
            },
            onError: (error)=>{
                console.error('transaction not deleted',error)
            }
        })

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
                dataIndex:'status',
                key:'status',
                render: (status : string)=> (
                    <Tag color={status=='APPROVED'?'green':status=='REJECTED'?'red':status=='PENDING'?'blue':'default'}>{status}</Tag>
                )
            },
            {
                title:'Action',
                dataIndex:'status',
                key:'action',
                width: 100,
                render: (status,record)=>(
                    <Popconfirm title='Sure to delete ?' okText='Yes' cancelText='No' onConfirm={()=>{deleteTransaction.mutate(record.idTransaction)}} >
                        <Button type='link' disabled={status!='PENDING'}><DeleteOutlined/></Button>
                    </Popconfirm>
                )
            }
           
        ]
  return (
    <Card title='Transactions History' style={{width:'100%'}} extra={<Button onClick={e=>setIsModalVisible(true)} type='primary' icon={<PlusOutlined/>}>New Transaction</Button>} >
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
       <NewTransactionModal isVisible={isModalVisible} setIsModalVisible={setIsModalVisible} budget={budget} refreshTransactions={transactions.refetch} />

    </Card>   
  )
}

export default budgetTransactions