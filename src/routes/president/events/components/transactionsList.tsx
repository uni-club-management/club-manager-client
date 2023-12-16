import React from 'react'
import { Student, Transaction } from '../../../../types'
import { Avatar, Card, Divider, Flex, List, Skeleton, Space, Typography } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
//TODO: apply infinite scroll

type Props = {
    eventId: string | undefined
}

function transactionsList({ eventId }: Props) {

    const getEventTransactions = async (): Promise<Transaction[]> => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/events/${eventId}/transactions`);
            console.log("event transactions :", res.data);
            return res.data;
        } catch (err) {
            console.error("can't fetch event transactions", err);
            throw err;
        }
    }

    const transactions = useQuery<Transaction[], Error>({
        queryKey: ['transactions', eventId],
        queryFn: getEventTransactions
    })

    const total = (): number => {
        let total = 0
        transactions.data?.forEach((transaction) => {
            total += transaction.valeur ? transaction.valeur : 0
        })
        return total
    }
    return (
        <Card style={{ maxHeight: '700px', width: '500px' }} bordered={false}>
            <Flex justify='space-between'>
                <div>
                    <Typography.Title level={1} style={{ display: 'inline' }}>{transactions?.data?.length} </Typography.Title>
                    <Typography.Text type='secondary'>transactions</Typography.Text>
                </div>
                <div>
                    <Typography.Title level={1} style={{ display: 'inline' }}>{total()}  </Typography.Title>
                    <Typography.Text type='secondary'>Dh</Typography.Text>
                </div>
            </Flex>
            <Divider />

            <List
                dataSource={transactions.data?.slice(0, 5)}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.valeur}
                            description={item.date ? new Date(item.date).toLocaleDateString() : null}
                            key={item.idTransaction}

                        />
                    </List.Item>
                )}
            >

            </List>



        </Card>
    )
}

export default transactionsList