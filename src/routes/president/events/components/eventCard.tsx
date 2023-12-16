import { Card, Flex, Space, Tag } from 'antd';
import { Event } from '../../../../types';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

const statusColors = {
  REQUESTED: 'blue',
  APPROVED: 'green',
  REJECTED: 'red',
  POST_EVENT: 'orange',
  CLOSED: 'purple',
};

interface EventCardProp{
    event : Event
    loading: boolean 
}


const App: React.FC<EventCardProp> = ({event, loading}) => {
  
  const navigate = useNavigate()

  const handleClick = ()=>{
    navigate(`/president/events/${event.idEvent}`)
  }
  return(
  
    <Card
      loading={loading}
      hoverable
      style={{ width: 240 }}
      cover={<img alt="Event-cover" src={event.cover} height={160} />}
      onClick= {handleClick}
    > 
      <Flex vertical justify='space-between' align='flex-start' style={{height:'120px'}}>
        <Meta title={event.name} description={event.description} key={event.idEvent}  />
        <Tag color={statusColors[event.status as keyof typeof statusColors]}>{event.status}</Tag>
      </Flex>
      
    </Card>
    
  
    
  
  );
}
 

export default App;