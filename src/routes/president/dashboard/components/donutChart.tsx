import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import { Card } from 'antd';
import axios from 'axios';
import { Budget } from '../../../../types';
import { useQuery } from '@tanstack/react-query';
interface Props {
    idClub: number|"";
    }
const BudgetdonutChart = ({idClub}:Props) => {
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

    const usedBudget = (): number => {
        let usedBudget = 0;
        budgets.data?.forEach((budget) => {
            usedBudget += budget.used_budget ?? 0;
        });
        return usedBudget;
    }
    const remainingBudget = (): number => {
        let remainingBudget = 0;
        budgets.data?.forEach((budget) => {
            remainingBudget += budget.budget_initial ?? 0;
        });
        remainingBudget -= usedBudget();
        return remainingBudget;
    }
  const data = [
    {
      type: 'used budget',
      value: usedBudget(),
    },
    {
      type: 'remaining budget',
      value: remainingBudget(),
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
        type: 'inner',
        offset: '-50%',
        content: '{value}',
        style: {
          textAlign: 'center',
          fontSize: 14,
        },
      },
    
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Budget\nusage',
      },
    },
    
  };
  return (
    <Card style={{height:"fit-content"}}>
        <Pie {...config} height={300} width={250} />

    </Card>
  );
};

export default BudgetdonutChart;