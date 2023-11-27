import { Card, Divider, Flex, Typography } from 'antd'
import React, { useState } from 'react'
import { Budget } from '../../../types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import BudgetInfo from './components/budgetInfo'
import BudgetCard from './components/budgetCard'



type Props = {}

const budget = (props: Props) => {
    const [clubId, setClubId] = useState<number>(2)

    const getBudgets = async (): Promise<Budget[]> => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/clubs/${clubId}/budgets`);
            console.log("budgets:", res.data);
            return res.data;
        } catch (err) {
            console.error("can't fetch budgets", err);
            throw err;
        }
    }

    const budgets = useQuery<Budget[], Error>({
        queryKey: ['budgets', clubId],
        queryFn: getBudgets
    })
    
  return (
    <Flex gap='middle' vertical >
        <BudgetCard budget={budgets.data? budgets.data[0]:{}} />
        <Divider/>

        <BudgetCard budget={budgets.data? budgets.data[1]:{}} />

    </Flex>
  )
}

export default budget