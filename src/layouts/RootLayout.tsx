import {Avatar, Button, Dropdown, Flex, Layout, Menu, MenuProps, theme} from 'antd';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useContext, useState} from "react";
import logo from "./../assets/logo.png"
import {AuthContext} from "../context";
import {PoweroffOutlined} from "@ant-design/icons";

const {Content, Sider, Header} = Layout;

type Props = {
    options:  MenuProps['items']
}
// TODO: FIX SIDEBAR
export default function RootLayout(props: Props) {

    const path = useLocation()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);


    console.log(path.pathname.split('/'))
    return (
        <Layout hasSider>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Flex justify={"center"} style={{
                    height: '56px',
                    borderRadius: '6px',
                    marginBottom: '26px',
                    margin: '4px'
                }}>
                    <img
                        src={logo}
                        alt={"logo"}
                        style={{
                            height: '56px',
                            borderRadius: '6px',
                        }}
                    />
                </Flex>

                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    theme={"dark"}
                    selectedKeys={[path.pathname.split('/')[2]]}
                    items={props.options}
                    onSelect={({key}) => (navigate(`${key}`))}
                >
                </Menu>
            </Sider>
            <Layout style={{marginLeft: collapsed ? 80 : 200, minHeight:'100vh', transition: 'all 0.2s,background 0s'}}>
                <LayoutHeader/>
                <Content
                    style={{
                        padding: 24,
                        margin: 16,
                        minHeight: 280,
                        background: "transparent",
                    }}
                >
                    <Outlet/>
                </Content>

            </Layout>
        </Layout>
    );
}


const LayoutHeader = () => {

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const { setUser} = useContext(AuthContext);
    const navigate = useNavigate()


    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button
                    type={"link"}
                    danger
                    onClick={() => {
                        setUser(undefined)
                        navigate('/login')
                    }}
                >
                    <PoweroffOutlined/>
                    logOut
                </Button>
            ),
        },
    ];

    return (
        <Header style={{padding: "0px 32px", background: colorBgContainer}}>
            <Flex justify={"end"} align={"center"}>
                <Dropdown menu={{ items }}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Avatar src={'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'}/>
                    </a>
                </Dropdown>
            </Flex>
        </Header>
    );
};

