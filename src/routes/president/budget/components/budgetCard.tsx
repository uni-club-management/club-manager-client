import { Card, Flex, Typography } from 'antd'
import BudgetInfo from './budgetInfo'
import { Budget } from '../../../../types'
import BudgetTransactions from './budgetTransactions'

type Props = {
    budget: Budget
}

const budgetCard = ({budget}: Props) => {
  return (
    <Card style={{backgroundColor:'transparent'}} >
        <Typography.Title level={3} >Budget {budget?.budgetType}</Typography.Title>
        <Flex gap='middle' >
            <BudgetInfo  budget={budget}/>
            <BudgetTransactions budget={budget}/>
        </Flex>
    </Card>
  )
}

export default budgetCard