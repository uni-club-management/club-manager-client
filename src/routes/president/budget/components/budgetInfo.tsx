import React from 'react'
import { Budget } from '../../../../types'
import { Card, Flex, Typography } from 'antd'

const calculateRemainingBudget = (budget : Budget) => {

    const budgetInitial = budget.budget_initial || 0;
    const usedBudget = budget.used_budget || 0;
    return budgetInitial - usedBudget;  
  
};

type Props = {
    budget : Budget
}

const budgetInfo = ({budget}: Props) => {
  return (
    <Flex gap='middle' vertical>
                <Card title='Initial Budget'>
                    <Typography.Title style={{display:'inline'}} level={2}>{budget.budget_initial}</Typography.Title>
                    <Typography.Text type='secondary'> Dh</Typography.Text>
                    
                </Card>
                <Card title='Used Budget'>
                    <Typography.Title style={{display:'inline'}} level={2}>{budget.used_budget}</Typography.Title>
                    <Typography.Text type='secondary'> Dh</Typography.Text>

                </Card>
                <Card title='Remaining Budget'>
                    <Typography.Title style={{display:'inline'}} level={2}>{calculateRemainingBudget(budget)}</Typography.Title>
                    <Typography.Text type='secondary'> Dh</Typography.Text>
                </Card>

    </Flex>
  )
}

export default budgetInfo