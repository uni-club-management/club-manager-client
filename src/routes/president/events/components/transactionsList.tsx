import {AuthenticationResponseRolesEnum,  Transaction} from "../../../../types";
import {Card, Divider, Flex, FloatButton, FloatButtonProps, List, Typography,} from "antd";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import {useContext, useState} from "react";
import {AuthContext} from "../../../../context";
import {PlusOutlined} from "@ant-design/icons";
import NewTransactionModal from "../../budget/components/newTransactionForm.tsx";
//TODO: apply infinite scroll

type Props = {
  eventId: string ;
};

function TransactionsList({ eventId }: Props) {

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const getEventTransactions = async (): Promise<Transaction[]> => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/v1/events/${eventId}/transactions`
      );
      console.log("event transactions :", res.data);
      return res.data;
    } catch (err) {
      console.error("can't fetch event transactions", err);
      throw err;
    }
  };

  const transactions = useQuery<Transaction[], Error>({
    queryKey: ["transactions", eventId],
    queryFn: getEventTransactions,
  });

  const total = (): number => {
    let total = 0;
    transactions.data?.forEach((transaction) => {
      total += transaction.valeur ? transaction.valeur : 0;
    });
    return total;
  };
  return (
    <Card style={{ maxHeight: "400px", width: "500px" }} bordered={false}>
      <Flex justify="space-between">
        <div>
          <Typography.Title level={1} style={{ display: "inline" }}>
            {transactions?.data?.length}{" "}
          </Typography.Title>
          <Typography.Text type="secondary">transactions</Typography.Text>
        </div>
        <div>
          <Typography.Title level={1} style={{ display: "inline" }}>
            {total()}{" "}
          </Typography.Title>
          <Typography.Text type="secondary">Dh</Typography.Text>
        </div>
      </Flex>
      <Divider />
      <div style={{ maxHeight: "250px", overflowY: "auto" }}>
        <List
          dataSource={transactions.data?.slice(0, 5)}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.valeur}
                description={
                  item.date ? new Date(item.date).toLocaleDateString() : null
                }
                key={item.idTransaction}
              />
            </List.Item>
          )}
        ></List>
      </div>
      <NewTransactionModal isVisible={isModalVisible} setIsModalVisible={setIsModalVisible}
                           idEvent={+eventId}

                           refreshTransactions={transactions.refetch}/>
        <NewTransactionButton onClick={()=>setIsModalVisible(true)}/>

    </Card>
  );
}

export default TransactionsList;


const NewTransactionButton = (props: FloatButtonProps) => {

  const {user} = useContext(AuthContext);

  if (
      !user?.roles?.includes(AuthenticationResponseRolesEnum.PRESIDENT)
      && !user?.roles?.includes(AuthenticationResponseRolesEnum.VICEPRESIDENT)
      && !user?.roles?.includes(AuthenticationResponseRolesEnum.TREASURER)
  )
    return null;

  return (
      <FloatButton onClick={props.onClick} type='primary' icon={<PlusOutlined/>} tooltip={"Add Transaction"}/>
  );
};
