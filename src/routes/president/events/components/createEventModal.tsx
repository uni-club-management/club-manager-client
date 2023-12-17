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
       
      </Form>
    </Modal>
  );
};

export default CreateEventModal;
