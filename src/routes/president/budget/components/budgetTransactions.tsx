import {Button, ButtonProps, Card, Flex, Popconfirm, Table, Tag, Tooltip} from 'antd'
import {useContext, useState} from 'react'
import {AuthenticationResponseRolesEnum, Budget, Event, Transaction} from '../../../../types'
import axios from 'axios'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import {ColumnsType} from 'antd/es/table'
import {CheckOutlined, CloseOutlined, DeleteOutlined, PlusOutlined} from '@ant-design/icons'
import NewTransactionModal from './newTransactionForm'
import {toast} from "react-toastify";
import {AuthContext} from "../../../../context";


type Props = {
    budget: Budget
}

const BudgetTransactions = ({budget}: Props) => {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(4)
    const [totalRows, setTotalRows] = useState<number>(0)
    const queryClient = useQueryClient();
    const {user} = useContext(AuthContext);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

    const getTransactions = async (): Promise<Transaction[]> => {
        return await axios.get(`http://localhost:8080/api/v1/budgets/${budget.idBudget}/transactions`, {
            params: {
                pageNumber: pageNumber - 1,
                pageSize: pageSize
            }
        }).then(res => {
                console.log('transactions:', res.data)
                setTotalRows(res.headers["total-pages"] * pageSize)
                return res.data
            }
        ).catch((err) => {
            console.error("can't fetch transactions")
            throw err
        })
    }

    const changeStatus = useMutation({
        mutationFn: ({id, operation}: { id: number, operation: "reject" | "approve" }) => {
            if (operation === "reject")
                return axios.put(`http://localhost:8080/api/v1/transactions/${id}/reject`)
            else
                return axios.put(`http://localhost:8080/api/v1/transactions/${id}/approve`)
        },
        onSuccess: () => {

            queryClient.refetchQueries({queryKey: ['transactions', budget.idBudget, pageNumber, pageSize]}).then(() => {
                toast.success('status changed successfully', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
        },
        onError: () => {
            toast.error('A problem occurred', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        },
    })


    const transactions = useQuery<Transaction[], Error>({
        queryKey: ['transactions', budget.idBudget, pageNumber, pageSize],
        queryFn: getTransactions
    })

    const deleteTransaction = useMutation({
        mutationFn: (id: number | undefined): Promise<void> => {
            return axios.delete(`http://localhost:8080/api/v1/transactions/${id}`)
        },
        onSuccess: () => {
            console.log('transaction deleted')
            transactions.refetch()
        },
        onError: (error) => {
            console.error('transaction not deleted', error)
        }
    })

    const columns: ColumnsType<Transaction> = [
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
            render: (event: Event) => event.name
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag
                    color={status == 'APPROVED' ? 'green' : status == 'REJECTED' ? 'red' : status == 'PENDING' ? 'blue' : 'default'}>{status}</Tag>
            )
        },
        {
            title: 'Action',
            dataIndex: 'status',
            key: 'action',
            width: 100,
            render: (status, record) => (
                <Flex align={"center"} justify={"center"} gap={8}>
                    {user?.roles?.includes(AuthenticationResponseRolesEnum.PROF) || user?.roles?.includes(AuthenticationResponseRolesEnum.ADMIN)
                        &&
                        <>
                            <Tooltip title={"approuve"}>
                                <Button type={"link"}
                                        disabled={status == 'APPROVED' && status != 'PENDING'}
                                        onClick={() => changeStatus.mutate({
                                            id: record.idTransaction as number,
                                            operation: "approve"
                                        })}
                                        icon={<CheckOutlined/>}
                                />
                            </Tooltip>
                            <Tooltip title={"reject"}>
                                <Button
                                    type={"link"}
                                    style={{filter: "grayscale(1)"}}
                                    ghost
                                    disabled={status == 'REJECTED' && status != 'PENDING'}
                                    onClick={() => changeStatus.mutate({
                                        id: record.idTransaction as number,
                                        operation: "reject"
                                    })}
                                    icon={<CloseOutlined/>}
                                />
                            </Tooltip>
                        </>
                    }
                    <Popconfirm title='Sure to delete ?' okText='Yes' cancelText='No' onConfirm={() => {
                        deleteTransaction.mutate(record.idTransaction)
                    }}>
                        <Tooltip title={"delete"}>
                            <Button type='link' danger disabled={status != 'PENDING'}><DeleteOutlined/></Button>
                        </Tooltip>
                    </Popconfirm>
                </Flex>
            )
        }

    ]
    return (
        <Card title='Transactions History' style={{width: '100%'}} extra={<NewTransactionButton onClick={() => setIsModalVisible(true)}/>}>
            <Table
                //scroll

                columns={columns}
                dataSource={transactions.data}
                loading={transactions.isLoading}
                pagination={{
                    defaultPageSize: 5,
                    pageSize: pageSize,
                    current: pageNumber,
                    total: totalRows,
                    pageSizeOptions: ['4', '10', '25'],
                    showSizeChanger: true,
                    onChange: (pageNumber, pageSize) => {
                        setPageNumber(pageNumber)
                        setPageSize(pageSize)
                    }
                }}
            />
            <NewTransactionModal isVisible={isModalVisible} setIsModalVisible={setIsModalVisible} budget={budget}
                                 refreshTransactions={transactions.refetch}/>

        </Card>
    )
}

export default BudgetTransactions



const NewTransactionButton = (props: ButtonProps) => {

    const {user} = useContext(AuthContext);

    if (
        !user?.roles?.includes(AuthenticationResponseRolesEnum.PRESIDENT)
        && !user?.roles?.includes(AuthenticationResponseRolesEnum.VICEPRESIDENT)
        && !user?.roles?.includes(AuthenticationResponseRolesEnum.TREASURER)
    )
        return null;

    return (
        <Button onClick={props.onClick} type='primary' icon={<PlusOutlined/>}>New Transaction</Button>
    );
};

