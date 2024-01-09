import { EditOutlined } from '@ant-design/icons'
import { UseQueryResult } from '@tanstack/react-query'
import { Button, Card, Flex, Tag, Typography , Image} from 'antd'
import React from 'react'
import { ClubDetails } from '../../../../types'

type Props = {
  clubDetails: UseQueryResult<ClubDetails, Error>
  isMobile: boolean
}

function ClubDetailsCard({clubDetails,isMobile}: Props) {
  return (
    <Card bordered={true} loading={clubDetails.isLoading} style={{width:"fit-content"}}>
      <Flex gap={"16px"} align="center" vertical={isMobile} >
        <Image
          loading={"eager"}
          src={clubDetails?.data?.cover}
          style={{ borderRadius: "16px", maxWidth: "500px"}}
        />

        <div>
          <div style={{ height: "fit-content", display: "flex", gap: "10px", alignItems:"center" }}>
            <Typography.Title level={2} style={{}}>
              {clubDetails?.data?.club?.name}
            </Typography.Title>
            {
              isMobile? null:<Tag
              style={{
                width: "fit-content",
                height: "fit-content",
                fontSize: "10px",
                alignSelf: "flex-end",
                marginBottom: "19px",
              }}
              color={
                clubDetails?.data?.club?.status == "ACTIVE"
                  ? "green"
                  : clubDetails?.data?.club?.status == "CREATION_STEP_1"
                  ? "orange"
                  : clubDetails?.data?.club?.status == "CREATION_STEP_2"
                  ? "purple"
                  : clubDetails?.data?.club?.status == "CREATION_STEP_3"
                  ? "blue"
                  : clubDetails?.data?.club?.status == "ABANDONED"
                  ? "volcano"
                  : "red"
              }
            >
              {clubDetails?.data?.club?.status}
            </Tag>
            }
           
            <Button
              type="text"
              icon={<EditOutlined />}
              size="large"
              style={{ marginLeft: "auto" }}
            />
          </div>

          <Typography.Paragraph>
            {clubDetails?.data?.description}
          </Typography.Paragraph>
          <Typography.Paragraph>
            {clubDetails?.data?.aboutUs}
          </Typography.Paragraph>
          <p>
            <Typography.Text type="secondary">type: </Typography.Text>
            <Typography.Text>{clubDetails?.data?.club?.type}</Typography.Text>
          </p>
          {clubDetails?.data?.club?.type == "ACADEMIC" ? (
            <p>
              <Typography.Text type="secondary">supervisor: </Typography.Text>
              <Typography.Text>
                {clubDetails?.data?.club?.supervisor?.firstName}{" "}
                {clubDetails?.data?.club?.supervisor?.lastName}
              </Typography.Text>
            </p>
          ) : null}
          {clubDetails?.data?.email ? (
            <p>
              <Typography.Text type="secondary">email: </Typography.Text>
              <Typography.Text>{clubDetails?.data?.email}</Typography.Text>
            </p>
          ) : null}
          
        </div>
      </Flex>
    </Card>
  )
}

export default ClubDetailsCard