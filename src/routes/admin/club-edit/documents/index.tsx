import {Button, Flex, List, Skeleton, Typography} from "antd";
import {useInfiniteQuery} from "@tanstack/react-query";
import axios from "axios";
import {Document} from "../../../../types";
import {useParams} from "react-router-dom";
import dateFormat from "dateformat";
import {formatBytes} from "../../../../utils/conversions.ts";
import FileIcon from "../../../../components/file-icon";
import React from "react";


const re = /(?:\.([^.]+))?$/;



const ClubDocumentsList = () => {

    const [totalPages, setTotalPages] = React.useState<number>(1)
    const {clubId} = useParams();

    // eslint-disable-next-line
    // @ts-ignore
    const fetchDocs = ({ pageParam  } ): Promise<Document[]> => {
        return axios.get<Document[]>(`http://localhost:8080/api/v1/documents/sender/${clubId}`, {
            params: {
                pageNumber: pageParam,
                pageSize: 10,
            }
        }).then(res => {
            setTotalPages(res.headers['total-pages'])
            return res.data
        })
    }

    const download = (id: number, fileName: string) => {
        axios.get(`http://localhost:8080/api/v1/documents/${id}`, {responseType: 'blob'}).then(response => {
            const type = response.headers['content-type']
            const blob = new Blob([response.data], {type: type})
            const link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = fileName
            link.click()
        }).catch((response) => {
            console.error("Could not Download the Excel report from the backend.", response);
        });
    }

    const docs = useInfiniteQuery<Document[], Error>({
        queryKey: ['docs', clubId],
        queryFn: fetchDocs,
        initialPageParam: 0,
        // eslint-disable-next-line
        // @ts-ignore
        getNextPageParam: (lastPage,allPages, lastPageParam) => {
            // eslint-disable-next-line
            // @ts-ignore
            if (lastPageParam < totalPages) {
                // eslint-disable-next-line
                // @ts-ignore
                return lastPageParam + 1
            }
            return undefined
        },
    })

    const loadMore =
        docs.hasNextPage ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 6,
                    marginBottom: 6,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={()=> docs.fetchNextPage()}>show more</Button>
            </div>
        ) : null;


    return (
        <List bordered
              loading={docs.isLoading}
              itemLayout="horizontal"
              dataSource={docs.data?.pages.flat()}
              loadMore={loadMore}
              renderItem={(item) => (
                  <List.Item>
                      <Skeleton avatar title={false} loading={docs.isLoading} active>
                          <Flex gap={"8px"}>
                              <FileIcon extension={re.exec(item.name as string)![1].toString()}/>
                              <Typography.Link onClick={() =>download(item.idDocument as number, item.name as string)}>{item.name}</Typography.Link>
                          </Flex>
                          <Flex gap={"64px"}>
                              <Typography.Text>{dateFormat(item.dateUpload, "mmm d, yyyy")}</Typography.Text>
                              <Typography.Text style={{width:"120px", textAlign:"end"}}>{formatBytes(item.size as number)}</Typography.Text>
                          </Flex>
                      </Skeleton>
                  </List.Item>
              )}
        />

    );
};

export default ClubDocumentsList;