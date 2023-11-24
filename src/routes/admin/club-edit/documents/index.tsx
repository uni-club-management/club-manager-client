import {Button, Flex, List, Skeleton, Typography} from "antd";
import {useQuery} from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import {Document} from "../../../../types";
import {useParams} from "react-router-dom";
import dateFormat from "dateformat";
import {formatBytes} from "../../../../utils/conversions.ts";

const ClubDocumentsList = () => {

    const [pageNumber, setPageNumber] = React.useState<number>(0)
    const [totalPages, setTotalPages] = React.useState<number>(0)
    const {clubId} = useParams();
    const fetchDocs = (): Promise<Document[]> => {
        return axios.get<Document[]>(`http://localhost:8080/api/v1/documents/sender/${clubId}`, {
            params: {
                pageNumber: pageNumber,
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

    const docs = useQuery<Document[], Error>({
        queryKey: ['docs', clubId, pageNumber],
        queryFn: fetchDocs
    })

    const loadMore =
        !docs.isLoading && (pageNumber + 1) < totalPages  ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 6,
                    marginBottom: 6,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={()=> setPageNumber(prev => prev+1)}>loading more</Button>
            </div>
        ) : null;


    return (
        <List bordered
              loading={docs.isLoading}
              itemLayout="horizontal"
              dataSource={docs.data}
              loadMore={loadMore}
              renderItem={(item) => (
                  <List.Item>
                      <Skeleton avatar title={false} loading={docs.isLoading} active>
                          <Typography.Link onClick={() =>download(item.idDocument as number, item.name as string)}>{item.name}</Typography.Link>
                          <Flex gap={"64px"}>
                              <Typography.Text>{dateFormat(item.dateUpload, "mmm d, yyyy")}</Typography.Text>
                              <Typography.Text>{formatBytes(item.size as number)}</Typography.Text>
                          </Flex>
                      </Skeleton>
                  </List.Item>
              )}
        />

    );
};

export default ClubDocumentsList;