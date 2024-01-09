import { Student } from '../../../../types'
import { Avatar, Card, Divider, List, Typography } from 'antd'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
//TODO: apply infinite scroll
type Props = {
    eventId: string | undefined
}

function participantsList({eventId}: Props) {

    const getEventParticipants = async (): Promise<Student[]> => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/events/${eventId}/participants`);
            console.log("event participants :", res.data);
            return res.data;
        } catch (err) {
            console.error("can't fetch event participants", err);
            throw err;
        }
    }

    const participants = useQuery<Student[], Error>({
        queryKey: ['participants', eventId],
        queryFn: getEventParticipants
    })

  return (
    <Card style={{ maxHeight:'400px', width: '500px' }} bordered={false}>
                            <Typography.Title level={1} style={{ display: 'inline' }}>{participants?.data?.length} </Typography.Title>
                            <Typography.Text type='secondary'>Participants</Typography.Text>
                            <Divider />
                            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                                <List
                                    dataSource={participants.data?.slice(0, 5)}
                                    renderItem={(item, index) => (
                                    <List.Item>
                                        <List.Item.Meta
                                        avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                        title={<a href="https://ant.design">{item.firstName} {item.lastName}</a>}
                                        description={item.email}
                                        />
                                    </List.Item>
                                    )}
                                />
                            </div>


                        </Card>
  )
}

export default participantsList