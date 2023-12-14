import React, { useState } from 'react';
import { Alert, Button, Form, InputNumber, Modal, Select, Upload } from 'antd';
import { Budget, Event } from '../../../../types';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
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
    const [form] = Form.useForm();
    const [clubId, setClubId] = useState<number>(2)
    const [isTransactionCreated, setIsTransactionCreated] = useState<boolean>(false)
    const [error_transactionNotCreated, setError_transactionNotCreated] = useState<boolean>(false)

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
    const createNewTransaction = (values: {idEvent:number,valeur:number}):Promise<any> => {       
            return axios.post(`http://localhost:8080/api/v1/transactions`, {
                date: new Date(),
                valeur: values.valeur,
                idBudget: budget.idBudget,
                idEvent: values.idEvent,
            })         
    }

    const mutation = useMutation({
        mutationFn: createNewTransaction,
        onSuccess: () => {
            setError_transactionNotCreated(false)
            setIsTransactionCreated(true)
            setTimeout(()=>setIsTransactionCreated(false),5000)
            form.resetFields()
            console.log('transaction created')
        },
        onError: (error) => {
            setIsTransactionCreated(false)
            setError_transactionNotCreated(true)
            // setTimeout(()=>setError_transactionNotCreated(false),3000)
            console.log('transaction not created', error)
        }
    })
    

   
    return (
        <Modal 
            title="Request a Transaction" 
            open={isVisible} 
            onCancel={() => setIsModalVisible(false)} 
            
            footer={[
                <Button key='submit' type='primary' 
                    loading={mutation.isPending} 
                    onClick={()=> form.submit()}>submit</Button>,
                <Button key='cancel'  onClick={()=>setIsModalVisible(false)}>cancel</Button>
                ]}
        >
            {isTransactionCreated &&<Alert  showIcon closable message='Transaction requested successfully' type='success'  />}
            {error_transactionNotCreated &&<Alert showIcon closable message={`Couldn't request transaction : ${mutation.error?.message}`}  type='error'  />}
            <Form onFinish={mutation.mutate} form={form} labelCol={{span:4}}  style={{paddingTop:'2em'}}>
                <Form.Item label="Source" >
                    <b>Budget {budget.budgetType}</b>
                </Form.Item>
                <Form.Item label="Event" name="idEvent">
                    <Select style={{width:'10rem'}}>
                        {events.data?.map((event)=>(
                            <Select.Option value={event.idEvent}>{event.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Amount" name="valeur">
                    <InputNumber min={0} max={calculateRemainingBudget(budget)}/>
                </Form.Item>
                <Form.Item label="Documents">
                <Form.Item /*name="dragger"*/ valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                    <Upload.Dragger /*name="files" action="/upload.do"*/>
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