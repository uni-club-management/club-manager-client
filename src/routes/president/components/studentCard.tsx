import { EllipsisOutlined, MessageOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Card } from 'antd';
import { Student } from '../../../types';

//TODO: implement card actions logic


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
          avatar={<Avatar src={`https://ui-avatars.com/api/?background=random&name=${student.firstName}+${student.lastName}`} />}
          title={student.firstName+" "+student.lastName}
          description={student.roles}
          key={student.idA}
          
        />
        
      </Card>
      
    </>
  );
};

export default StudentCard;