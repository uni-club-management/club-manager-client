import React from 'react';
import {Button, Flex, Table, Tag} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {Event} from "../../../../types";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import Search, {SearchProps} from "antd/es/input/Search";
import {Link} from "react-router-dom";
import {EditOutlined} from "@ant-design/icons";
import dateFormat from "dateformat";




const EVentList = () => {

    const [pageNumber, setPageNumber] = React.useState<number>(1)
    const [pageSize, setPageSize] = React.useState<number>(10)
    const [totalRows, setTotalRows] = React.useState<number>(10)
    const [searchText, setSearchText] = React.useState<string>("")
    const [status, setStatus] = React.useState<string[]|null>()



    const columns: ColumnsType<Event> = [
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
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (date : Date) => {
                return dateFormat(date,'mmm d, yyyy')
            }
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                return (
                    <Tag
                        color={
                            status == "REQUESTED" ? "green" :
                                status == "APPROVED" ? "orange" :
                                    status == "REJECTED" ? "purple" :
                                        status == "POST_EVENT" ? "blue" :
                                            status == "CLOSED" ? "volcano" :
                                                "red"}
                    >
                        {status}
                    </Tag>
                )
            },
            filters:[
                {
                    text: <Tag color={"green"}>REQUESTED</Tag>,
                    value: "REQUESTED"
                },
                {
                    text: <Tag color={"orange"}>APPROVED</Tag>,
                    value: "APPROVED"
                },
                {
                    text: <Tag color={"purple"}>REJECTED</Tag>,
                    value: "REJECTED"
                },
                {
                    text: <Tag color={"blue"}>POST_EVENT</Tag>,
                    value: "POST_EVENT"
                },
                {
                    text: <Tag color={"volcano"}>CLOSED</Tag>,
                    value: "CLOSED"
                }
            ],
            filterMultiple: true,
        },
        {
            title: 'Action',
            dataIndex: 'idC',
            key: 'action',
            render: (_, record) => (
                <Link to={`${record.idEvent}`}>
                    <Button icon={<EditOutlined/>}></Button>
                </Link>
            ),
        }
    ]
    const fetchEvents = (): Promise<Event[]> => {
        return axios.get<Event[]>("http://localhost:8080/api/v1/events", {
            params: {
                pageNumber: pageNumber - 1,
                pageSize: pageSize,
                search: searchText,
                status: status && status.toString(),
            }
        }).then(res => {
            setTotalRows(pageSize * res.headers['total-pages'])
            return res.data
        })
    }

    const data = useQuery<Event[], Error>({
        queryKey: ['events', pageNumber, pageSize, searchText, status],
        queryFn: fetchEvents,
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
                }}
            />
        </Flex>

    );
};

export default EVentList;