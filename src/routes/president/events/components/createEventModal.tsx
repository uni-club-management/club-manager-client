import { useMutation } from "@tanstack/react-query";
import { Button, DatePicker, Form, Image, Input, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";

type Props = {
  isVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  idClub: number | "";
};

const CreateEventModal = ({ isVisible, setIsModalVisible, idClub}: Props) => {
  const [form] = Form.useForm();
  const [coverImg, setCoverImg] = useState<string>("https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg");

  const mutation = useMutation({
    mutationFn:(values:{cover:string,name:string,description:string,date:Date})=>axios.post("http://localhost:8080/api/v1/events",{
        name: values.name,
        description: values.description,
        date: values.date,
        organizer: idClub
    }),
    onSuccess:()=>{
        console.log("Event created succefully")
    },
    onError: (err)=>{
        console.log("Event not created : ", err)
    }
    
  })

  return (
    <Modal
      title="Lets create a new Event !!!"
      open={isVisible}
      onCancel={() => setIsModalVisible(false)}
      okText="submit"
      onOk={form.submit}
    >
      <Form
        form={form}
        style={{ paddingTop: "10px" }}
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
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
