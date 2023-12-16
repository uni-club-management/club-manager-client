import {
    FileExcelOutlined,
    FileGifOutlined,
    FileImageOutlined,
    FileOutlined,
    FilePdfOutlined,
    FilePptOutlined,
    FileWordOutlined, FileZipOutlined
} from "@ant-design/icons";

type Props = {
    extension: string
};
const FileIcon = (props: Props) => {

    switch (props.extension){
        case 'doc':
        case 'docm':
        case 'docx':
        case 'dotx':
            return (<FileWordOutlined/>)
        case 'gif':
            return (<FileGifOutlined/>)
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'svg':
            return (<FileImageOutlined/>)
        case 'pdf':
            return (<FilePdfOutlined/>)
        case 'ppt':
        case 'pps':
        case 'pptm':
        case 'pptx':
            return (<FilePptOutlined/>)
        case 'xls':
        case 'xlsm':
        case 'xlt':
        case 'xltm':
        case 'xltx':
        case 'xlsx':
            return (<FileExcelOutlined/>)
        case 'zip':
        case 'rar':
        case 'tar':
            return (<FileZipOutlined/>)
        default:
            return (<FileOutlined/>)
    }

};

export default FileIcon;