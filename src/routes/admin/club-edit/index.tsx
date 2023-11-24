import {Card, Dropdown, Flex, Image, MenuProps, Tabs, TabsProps, Tag, Typography} from "antd";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {ClubDetails, ClubStatusEnum} from "../../../types";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import {DollarCircleOutlined, FileOutlined, TeamOutlined} from "@ant-design/icons";


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
    const [clubStatus, setClubStatus] = React.useState<ClubStatusEnum>()
    const navigate = useNavigate()
    const path = useLocation()


    const items: MenuProps['items'] = [
        {
            key: 'ACTIVE',
            label: (
                <Tag color={"green"}>ACTIVE</Tag>
            ),
            onClick: () => setClubStatus(ClubStatusEnum.ACTIVE)
        },
        {
            key: 'CREATION_STEP_1',
            label: (
                <Tag color={"orange"}>CREATION_STEP_1</Tag>
            ),
            onClick: () => setClubStatus(ClubStatusEnum.CREATIONSTEP1)
        },
        {
            key: 'CREATION_STEP_2',
            label: (
                <Tag color={"purple"}>CREATION_STEP_2</Tag>
            ),
            onClick: () => setClubStatus(ClubStatusEnum.CREATIONSTEP2)
        },
        {
            key: 'CREATION_STEP_3',
            label: (
                <Tag color={"blue"}>CREATION_STEP_3</Tag>
            ),
            onClick: () => setClubStatus(ClubStatusEnum.CREATIONSTEP3)
        },
        {
            key: 'ABANDONED',
            label: (
                <Tag color={"volcano"}>ABANDONED</Tag>
            ),
            onClick: () => setClubStatus(ClubStatusEnum.ABANDONED)
        },
    ];
    const fetchClubInfo = (): Promise<ClubDetails> => {
        return axios.get<ClubDetails>(`http://localhost:8080/api/v1/clubs/${clubId as string}/details`).then(res => {
            return res.data
        })
    }

    const data = useQuery<ClubDetails, Error>({
        queryKey: ['clubInfo', clubId],
        queryFn: fetchClubInfo,
    })

    console.log(clubStatus)


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
                            <Dropdown menu={{items}}>
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
                            </Dropdown>
                            <Typography.Paragraph>{data?.data?.club?.description}</Typography.Paragraph>
                            <Typography.Title level={5}>about the club</Typography.Title>
                            <Typography.Paragraph>{data?.data?.aboutUs}</Typography.Paragraph>

                        </Flex>

                    </Flex>
                </Flex>
            </Card>
            <Card>
                <Tabs activeKey={path.pathname.split('/')[3] ?? 'budget'} items={tabs} onChange={(key : string) => (navigate(`${key}`))}/>
            </Card>
        </Flex>
    );
};

export default ClubEditAdminPage;