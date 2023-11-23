import { EditOutlined, EllipsisOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Avatar, Card, Skeleton, Switch } from 'antd';
import { Student } from '../../../types';

const { Meta } = Card;
interface StudentCardProp{
    student : Student;
    loading: boolean
}
const StudentCard: React.FC<StudentCardProp> = ({student, loading}) => {

 

  return (
    <>
      <Card 
        style={{ width: 300, marginTop: 16 }}
        loading={loading}
        actions={[
            <EllipsisOutlined key="ellipsis"/>,
            <MessageOutlined />
        ]}
        >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
          title={student.firstName+" "+student.lastName}
          description={student.roles}
          key={student.idA}
          
        />
        
      </Card>
      
    </>
  );
};

export default StudentCard;