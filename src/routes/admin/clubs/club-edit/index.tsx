import {Button, Card,  Flex, Image,  Tabs, TabsProps, Tag, Typography} from "antd";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {ClubDetails} from "../../../../types";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import {DollarCircleOutlined, EditOutlined, FileOutlined, TeamOutlined} from "@ant-design/icons";
import ClubEditModal from "./components/club-edit-modal";


const tabs: TabsProps['items'] = [
    {
        key: 'budget',
        label: (
            <span>
                    <DollarCircleOutlined/>
                    Budget
                </span>
        ),
        children: <Outlet/>,
    },
    {
        key: 'members',
        label: (
            <span>
                    <TeamOutlined/>
                    Members
                </span>
        ),
        children: <Outlet/>,
    },
    {
        key: 'documents',
        label: (
            <span>
                    <FileOutlined/>
                    Documents
                </span>
        ),
        children: <Outlet/>,
    },
];

const ClubEditAdminPage = () => {

    const {clubId} = useParams();
    const [isModalOpen, setIsModelOpen] = React.useState<boolean>(false);
    const navigate = useNavigate()
    const path = useLocation()


    const fetchClubInfo = (): Promise<ClubDetails> => {
        return axios.get<ClubDetails>(`http://localhost:8080/api/v1/clubs/${clubId as string}/details`).then(res => {
            return res.data
        })
    }

    const data = useQuery<ClubDetails, Error>({
        queryKey: ['clubInfo', clubId],
        queryFn: fetchClubInfo,
    })


    return (
        <Flex vertical gap={"16px"}>
            <Card bordered={true} loading={data.isLoading}>
                <Flex vertical gap={"16px"}>
                    <Flex gap={"16px"}>
                        <Image
                            loading={"eager"}
                            height={150}
                            width={150}
                            style={{borderRadius: '16px'}}
                            src={data?.data?.logo}
                        />
                        <Flex vertical>
                            <Typography.Title level={2}>
                                {data?.data?.club?.name}
                            </Typography.Title>
                            <Tag
                                style={{width: "fit-content"}}
                                color={
                                    data?.data?.club?.status == "ACTIVE" ? "green" :
                                        data?.data?.club?.status == "CREATION_STEP_1" ? "orange" :
                                            data?.data?.club?.status == "CREATION_STEP_2" ? "purple" :
                                                data?.data?.club?.status == "CREATION_STEP_3" ? "blue" :
                                                    data?.data?.club?.status == "ABANDONED" ? "volcano" :
                                                        "red"}
                            >
                                {data?.data?.club?.status}
                            </Tag>
                            <Typography.Paragraph>{data?.data?.club?.description}</Typography.Paragraph>
                            <Typography.Title level={5}>about the club</Typography.Title>
                            <Typography.Paragraph>{data?.data?.aboutUs}</Typography.Paragraph>

                        </Flex>
                        <Button style={{marginLeft: "auto"}} icon={<EditOutlined/>}
                                onClick={() => setIsModelOpen(true)}/>
                    </Flex>
                </Flex>
            </Card>
            <ClubEditModal club={data?.data?.club} open={isModalOpen} onCancel={() => setIsModelOpen(false)}/>
            <Card>
                <Tabs activeKey={path.pathname.split('/')[4] ?? 'budget'} items={tabs}
                      onChange={(key: string) => (navigate(`${key}`))}/>
            </Card>
        </Flex>
    );
};

export default ClubEditAdminPage;