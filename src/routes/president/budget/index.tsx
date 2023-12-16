import {  Divider, Flex } from 'antd'
import { Budget } from '../../../types'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import BudgetCard from './components/budgetCard'
import {useParams} from "react-router-dom";
import {useContext} from "react";
import {ClubContext} from "../../../context";





const ClubBudget = () => {
    const {clubId} = useParams();
    const club = useContext(ClubContext)
    const idClub = (clubId && +clubId) ?? club.clubId ?? 1

    const getBudgets = async (): Promise<Budget[]> => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/clubs/${idClub}/budgets`);
            console.log("budgets:", res.data);
            return res.data;
        } catch (err) {
            console.error("can't fetch budgets", err);
            throw err;
        }
    }

    const budgets = useQuery<Budget[], Error>({
        queryKey: ['budgets', idClub],
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

export default ClubBudget