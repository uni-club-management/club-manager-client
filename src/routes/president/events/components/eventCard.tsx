import { Card } from 'antd';
import { Event } from '../../../../types';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

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
      cover={<img alt="Event-cover" src={event.cover} />}
      onClick= {handleClick}
    >
      <Meta title={event.name} description={event.description} key={event.idEvent} />
    </Card>
    
  
    
  
  );
}
 

export default App;