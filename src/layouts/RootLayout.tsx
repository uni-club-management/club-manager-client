import {Layout, Menu, MenuProps, theme} from 'antd';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {useState} from "react";

const {Content, Sider, Header} = Layout;

type Props = {
    options:  MenuProps['items']
}
// TODO: FIX SIDEBAR
export default function RootLayout(props: Props) {

    const path = useLocation()
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer},
    } = theme.useToken();

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
                <div style={{
                    height: '32px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,.2)',
                    margin: '16px'
                }}>Logo
                </div>

                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    theme={"dark"}
                    selectedKeys={[path.pathname.split('/')[1]] ?? ['clubs']}
                    items={props.options}
                    onSelect={({key}) => (navigate(`${key}`))}
                >
                </Menu>
            </Sider>
            <Layout style={{marginLeft: collapsed ? 80 : 200, minHeight:'100vh', transition: 'all 0.2s,background 0s'}}>
                <Header style={{padding: 0, background: colorBgContainer}}/>
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