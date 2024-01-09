import React from 'react';
import {Button, Flex, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {Club} from "../../../../types";
import {toProperCase} from "../../../../utils/string-formater.ts";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Search, {SearchProps} from "antd/es/input/Search";
import {Link} from "react-router-dom";
import {EditOutlined} from "@ant-design/icons";


const ClubList = () => {

    const [pageNumber, setPageNumber] = React.useState<number>(1)
    const [pageSize, setPageSize] = React.useState<number>(10)
    const [totalRows, setTotalRows] = React.useState<number>(10)
    const [searchText, setSearchText] = React.useState<string>("")
    const [status, setStatus] = React.useState<string[] | null>()
    const [type, setType] = React.useState<string[] | null>()


    const columns: ColumnsType<Club> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => {
                return (
                    <Tag color={type == "NORMAL" ? "geekblue" : "magenta"}>{toProperCase(type)}</Tag>
                )
            },
            filters: [
                {
                    text: <Tag color={"geekblue"}>NORMAL</Tag>,
                    value: "NORMAL"
                },
                {
                    text: <Tag color={"magenta"}>ACADEMIC</Tag>,
                    value: "ACADEMIC"
                }
            ],
            filterMultiple: false
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                return (
                    <Tag
                        color={
                            status == "ACTIVE" ? "green" :
                                status == "CREATION_STEP_1" ? "orange" :
                                    status == "CREATION_STEP_2" ? "purple" :
                                        status == "CREATION_STEP_3" ? "blue" :
                                            status == "ABANDONED" ? "volcano" :
                                                "red"}
                    >
                        {status}
                    </Tag>
                )
            },
            filters: [
                {
                    text: <Tag color={"green"}>ACTIVE</Tag>,
                    value: "ACTIVE"
                },
                {
                    text: <Tag color={"orange"}>CREATION_STEP_1</Tag>,
                    value: "CREATION_STEP_1"
                },
                {
                    text: <Tag color={"purple"}>CREATION_STEP_2</Tag>,
                    value: "CREATION_STEP_2"
                },
                {
                    text: <Tag color={"blue"}>CREATION_STEP_3</Tag>,
                    value: "CREATION_STEP_3"
                },
                {
                    text: <Tag color={"volcano"}>ABANDONED</Tag>,
                    value: "ABANDONED"
                }
            ],
            filterMultiple: true,

        },
        {
            title: 'Action',
            dataIndex: 'idC',
            key: 'action',
            render: (_, record) => (
                <Link to={`${record.idC}`}>
                    <Button icon={<EditOutlined/>}></Button>
                </Link>
            ),
        }
    ]
    const fetchClubs = (): Promise<Club[]> => {
        return axios.get<Club[]>("http://localhost:8080/api/v1/clubs", {
            params: {
                pageNumber: pageNumber - 1,
                pageSize: pageSize,
                search: searchText,
                status: status && status.toString(),
                type: type && type.toString(),

            }
        }).then(res => {
            setTotalRows(pageSize * res.headers['total-pages'])
            return res.data
        })
    }

    const data = useQuery<Club[], Error>({
        queryKey: ['clubs', pageNumber, pageSize, searchText, status, type],
        queryFn: fetchClubs,
    })

    const onSearch: SearchProps['onSearch'] = (value) => {
        setPageNumber(1)
        setSearchText(value)
    };


    console.log(status)

    return (
        <Flex vertical gap={'16px'}>
            <Search
                placeholder="input search text"
                allowClear
                onSearch={onSearch}
                style={{width: 304}}
            />
            <Table
                bordered
                columns={columns}
                dataSource={data.data}
                loading={data.isLoading}
                pagination={{
                    defaultPageSize: 10,
                    pageSize: pageSize,
                    current: pageNumber,
                    total: totalRows,
                    pageSizeOptions: ['10', '25', '50'],
                    showSizeChanger: true,
                    onChange: (page, pageSize) => {
                        setPageNumber(page)
                        setPageSize(pageSize)
                    }
                }}
                onChange={(_, filters) => {
                    setStatus(filters.status as string[])
                    setType(filters.type as string[]) // work around d walou
                }}
            />
        </Flex>

    );
};

export default ClubList;