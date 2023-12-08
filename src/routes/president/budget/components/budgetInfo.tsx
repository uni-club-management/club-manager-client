import { Budget } from '../../../../types'
import { Card, Flex, Typography } from 'antd'
import {calculateRemainingBudget} from '../../../../utils/remaining-budget'


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