import { UseQueryResult, useMutation } from '@tanstack/react-query';
import { Modal, Button, Alert, Input, Image, Form, Typography} from 'antd'
import React, { useState } from 'react'
import { ClubDetails } from '../../../../types';
import axios from 'axios';

type Props = {
    isVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    clubDetails: UseQueryResult<ClubDetails, Error>
}

const ClubEditModel = ({isVisible, setIsModalVisible, clubDetails}: Props) => {

    const [form] = Form.useForm();
    const [coverImg, setCoverImg] = useState<string>(clubDetails.data?.cover??'https://t3.ftcdn.net/jpg/05/04/28/96/360_F_504289605_zehJiK0tCuZLP2MdfFBpcJdOVxKLnXg1.jpg');
  
    const [isDetailsUpdated,setIsDetailsUpdated]=useState<boolean>(false)
    const [error_detailsNotUpdated,setError_detailsNotUpdated]=useState<boolean>(false)


  const mutation = useMutation({
    mutationFn:(values:{cover:string,description:string,aboutUs:string,email:string})=>{
      console.log("updating clubDetails : ", values,"idClub:",clubDetails.data?.club?.idC)
      return axios.put(`http://localhost:8080/api/v1/clubs/${clubDetails.data?.club?.idC}/details`,{
        description: values.description,
        cover: values.cover,
        aboutUs: values.aboutUs,
        email: values.email,
    })},
    onSuccess:(v)=>{
        console.log("clubDetails updated succefully :",v )
        setError_detailsNotUpdated(false)
        setIsDetailsUpdated(true)
        setTimeout(()=>setIsDetailsUpdated(false),5000)
        clubDetails.refetch()
        setCoverImg(v.data.cover)
        form.setFields([{name:'description',value:v.data.description},{name:'aboutUs',value:v.data.aboutUs},{name:'email',value:v.data.email}])
    },
    onError: (err)=>{
        console.log("clubDetails not updated : ", err)
        setIsDetailsUpdated(false)
        setError_detailsNotUpdated(true)
    }
    
  })


  return (
    <Modal
      title="Update Club Details"
      open={isVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={[
        <Button key='submit' type='primary' 
            loading={mutation.isPending} 
            onClick={()=> form.submit()}>submit</Button>,
        <Button key='cancel'  onClick={()=>setIsModalVisible(false)}>cancel</Button>
        ]}
    >
        
        {isDetailsUpdated &&<Alert  showIcon closable message='Club Details updated successfully' type='success'  />}
        {error_detailsNotUpdated &&<Alert showIcon closable message={`Couldn't update club details : ${mutation.error?.message}`}  type='error'  />}
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
        <Form.Item label="Name" name="name" initialValue={clubDetails.data?.club?.name} rules={[{min:3,message:"min 3 chars"},{max:50,message:"max 50 chars"}]}>
            <Typography.Text > {clubDetails.data?.club?.name}</Typography.Text>
        </Form.Item>
        <Form.Item label="Description" name="description" initialValue={clubDetails.data?.description} rules={[{min:10,message:"min 10 chars"},{max:500,message:"max 500 chars"},{required:true}]} >
            <Input.TextArea  maxLength={500}  showCount/>
        </Form.Item>
        <Form.Item label="aboutUs" name="aboutUs" initialValue={clubDetails.data?.aboutUs} rules={[{min:10,message:"min 10 chars"},{max:500,message:"max 500 chars"},{required:true}]} >
            <Input.TextArea maxLength={500}  showCount/>
        </Form.Item>
        <Form.Item label="Email" name="email" initialValue={clubDetails.data?.email} rules={[{max:50,message:"max 50 chars"}]}>
            <Input type="email" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ClubEditModel