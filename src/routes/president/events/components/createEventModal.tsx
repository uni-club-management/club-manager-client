import { useMutation } from "@tanstack/react-query";
import { Alert, Button, DatePicker, Form, Image, Input, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  isVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  idClub: number | "";
  refetchEvents: ()=> void;
};

const CreateEventModal = ({ isVisible, setIsModalVisible, idClub, refetchEvents}: Props) => {

  const [form] = Form.useForm();
  const [coverImg, setCoverImg] = useState<string>("https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg");

    const [isEventCreated,setIsEventCreated]=useState<boolean>(false)
    const [error_eventNotCreated,setError_eventNotCreated]=useState<boolean>(false)


  const mutation = useMutation({
    mutationFn:(values:{cover:string,name:string,description:string,date:Date})=>{
      console.log("requesting event creation: ", values)
      return axios.post("http://localhost:8080/api/v1/events",{
        name: values.name,
        description: values.description,
        date: values.date,
        organizer: idClub
    })},
    onSuccess:(v)=>{
        console.log("Event created succefully :",v )
        setError_eventNotCreated(false)
        setIsEventCreated(true)
        setTimeout(()=>setIsEventCreated(false),5000)
        form.resetFields()
        refetchEvents()
    },
    onError: (err)=>{
        console.log("Event not created : ", err)
        setIsEventCreated(false)
        setError_eventNotCreated(true)
        // setTimeout(()=>setError_transactionNotCreated(false),3000)
    }
    
  })

  return (
    <Modal
      title="Lets create a new Event !!!"
      open={isVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key='submit' type='primary' 
            loading={mutation.isPending} 
            onClick={()=> form.submit()}>submit</Button>,
        <Button key='cancel'  onClick={()=>setIsModalVisible(false)}>cancel</Button>
        ]}
    >
        
        {isEventCreated &&<Alert  showIcon closable message='Event successfully' type='success'  />}
        {error_eventNotCreated &&<Alert showIcon closable message={`Couldn't create Event : ${mutation.error?.message}`}  type='error'  />}
      <Form
        form={form}
        style={{ paddingTop: "10px" }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        onFinish={mutation.mutate}
      >
        <Image
          src={coverImg}
          alt="T_T Can't load cover image"
          style={{ marginLeft: "20px", padding: "10px" }}
        />
        <Form.Item label="Cover" name="cover">
          <Input
            addonAfter={
              <Button
                type="text"
                onClick={() => setCoverImg(form.getFieldValue("cover"))}
              >
                Preview
              </Button>
            }
          />
        </Form.Item>
        <Form.Item label="Title" name="name" required>
            <Input maxLength={50}/>
        </Form.Item>
        <Form.Item label="Description" name="description" required>
            <Input.TextArea maxLength={500} showCount/>
        </Form.Item>
        <Form.Item  label="Date" name="date" required>
            <DatePicker/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
