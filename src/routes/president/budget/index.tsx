import {Flex, Spin} from 'antd'
import {Budget, BudgetBudgetTypeEnum} from '../../../types'
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
        {
            budgets.isSuccess?
                budgets.data?.sort((a) => {
                    if (a.budgetType === BudgetBudgetTypeEnum._1)
                        return -1
                    else
                        return 1
                }).map((budget) => {
                    return (
                        <BudgetCard budget={budget}/>
                    )
                })
                :
                <Spin/>
        }

    </Flex>
  )
}

export default ClubBudget