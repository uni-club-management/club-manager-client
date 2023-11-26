import React from 'react'
import { Student } from '../../../../types'
import { Avatar, Card, Divider, List, Skeleton, Typography } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'

type Props = {
    participants: Student[] | undefined
}

function participantsList({participants}: Props) {
  return (
    <Card style={{ maxHeight:'700px', width: '500px' }} bordered={false}>
                            <Typography.Title level={1} style={{ display: 'inline' }}>{participants?.length} </Typography.Title>
                            <Typography.Text type='secondary'>Participants</Typography.Text>
                            <Divider />
                            <InfiniteScroll
                                style={{ overflow: 'hidden' }}
                                dataLength={2}
                                next={() => console.log('next')}
                                hasMore={false}
                                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    dataSource={participants?.slice(0, 5)}
                                    renderItem={(item, index) => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={
                                                    <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                                                } title={<a href="https://ant.design">{item.firstName} {item.lastName}</a>}
                                                description={item.email}
                                            />
                                        </List.Item>
                                    )}
                                >

                                </List>

                            </InfiniteScroll>

                        </Card>
  )
}

export default participantsList