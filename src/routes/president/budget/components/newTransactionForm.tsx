import React, { useState } from 'react';
import { Form, InputNumber, Modal, Select, Upload } from 'antd';
import { Budget, Event } from '../../../../types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { calculateRemainingBudget } from '../../../../utils/remaining-budget';
import { InboxOutlined } from '@ant-design/icons';

type Props = {
    isVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    budget: Budget
};

const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

const newTransactionModal = ({ isVisible, setIsModalVisible, budget }: Props) => {

    const [clubId, setClubId] = useState<number>(2)

    const getEvents = (): Promise<Event[]>=>{
        return axios.get(`http://localhost:8080/api/v1/clubs/${clubId}/events`).then(res=>{
            console.log("events:",res.data)
            return res.data
        }).catch(err=>{
            console.error("can't fetch events",err)
            return []
        })
    }
    const events = useQuery<Event[],Error>({
        queryKey:['events',clubId],
        queryFn: getEvents
    
    })

    return (
        <Modal title="Request a Transaction" open={isVisible} onCancel={() => setIsModalVisible(false)}>
            <Form labelCol={{span:4}}  style={{paddingTop:'2em'}}>
                <Form.Item label="Source">
                    <b>Budget {budget.budgetType}</b>
                </Form.Item>
                <Form.Item label="Event" name="event">
                    <Select style={{width:'10rem'}}>
                        {events.data?.map((event)=>(
                            <Select.Option value={event.idEvent}>{event.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Amount">
                    <InputNumber min={0} max={calculateRemainingBudget(budget)}/>
                </Form.Item>
                <Form.Item label="Documents">
                <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger name="files" action="/upload.do">
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Upload.Dragger>
                </Form.Item>
                </Form.Item>
            </Form>
        </Modal>
    );
};


export default newTransactionModal