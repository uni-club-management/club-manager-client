import React from 'react';
import { Card } from 'antd';
import { Event } from '../../../../types';

const { Meta } = Card;

interface EventCardProp{
    event : Event
    loading: boolean 
}

const App: React.FC<EventCardProp> = ({event, loading}) => (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="Event-cover" src={event.cover} />}
  >
    <Meta title={event.name} description={event.description} key={event.idEvent} />
  </Card>
);

export default App;