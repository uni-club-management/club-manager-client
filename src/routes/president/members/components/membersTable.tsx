import {Card, Flex, Table, Tooltip} from 'antd'
import {ColumnsType} from 'antd/es/table';
import {useContext, useRef, useState} from 'react'
import {Student} from '../../../../types';
import axios from "axios"
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {ExportOutlined, UploadOutlined} from '@ant-design/icons';
import {ClubContext} from "../../../../context";
import {toast} from "react-toastify";

//TODO: add ts types

const columns: ColumnsType<Student> = [{
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
},
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Major',
        dataIndex: 'major',
        key: 'major',
    },
    {
        title: 'Role',
        dataIndex: 'roles',
        key: 'role',

    }
]


export default function MembersTable() {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)
    const [totalRows, setTotalRows] = useState<number>(30)
    const {clubId} = useContext(ClubContext);
    const queryClient = useQueryClient()

    // I know I should use "any" but I don't know how to fix it
    const hiddenFileInput = useRef<any>(null); // ADDED

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleClick = event => {
        hiddenFileInput!.current!.click();
    };


    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        mutation.mutate(fileUploaded);
    };


    const mutation = useMutation({
        mutationFn: (file: File) => {
            return axios.postForm(`http://localhost:8080/api/v1/clubs/${clubId}/members`, {
                "file": file
            }, {
                onUploadProgress: progressEvent => console.log((progressEvent.loaded / (progressEvent.total ?? 1)) * 100)
            })
        },
        onSuccess: () => {

            queryClient.refetchQueries({queryKey: ['members', pageNumber, pageSize]}).then(() => {
                toast.success('file uploaded successfully', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
        },
        onError: () => {
            toast.error('A problem occurred', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        },
    })

    const getClubMembers = (): Promise<Student[]> => {
        return axios.get<Student[]>(`http://localhost:8080/api/v1/clubs/${clubId}/members`, {
                params: {
                    pageNumber: pageNumber - 1,
                    pageSize: pageSize,

                }
            }
        ).then(res => {
            setTotalRows(pageSize * res.headers['total-pages'])
            console.log(res.data)
            return res.data
        }).catch(err => {
            console.log(err)
            return []
        })
    }

    const data = useQuery<Student[], Error>({
        queryKey: ['members', pageNumber, pageSize],
        queryFn: getClubMembers,
    })

    const download = () => {
        axios.get(`http://localhost:8080/api/v1/clubs/${clubId}/members/file`, {responseType: 'blob'}).then(response => {
            const type = response.headers['content-type']
            const blob = new Blob([response.data], {type: type})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = "member list.xlsx"
            link.click()
        }).catch((response) => {
            console.error("Could not Download the Excel report from the backend.", response);
        });
    }


    return (
        <Card
            title="All Members"
            extra={
                <Flex align={"center"} gap={24}>
                    <Tooltip title={"import"}>
                        <>
                            <UploadOutlined onClick={handleClick}/>
                            <input
                                onChange={handleChange}
                                ref={hiddenFileInput}
                                type="file"
                                id="upload"
                                style={{display: "none"}}/>
                        </>


                    </Tooltip>
                    <Tooltip title={"export"}>
                        <ExportOutlined onClick={() => download()}/>
                    </Tooltip>
                </Flex>
            }
            style={{marginTop: '20px'}}
        >
            <Table
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
            />
        </Card>

    )
}