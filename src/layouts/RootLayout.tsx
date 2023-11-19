
import { Layout, Menu, theme } from 'antd';
import {Link, Outlet} from 'react-router-dom';
import {SideBarOptions} from "./side-bar-options.ts";
import {useState} from "react";

const { Content, Sider } = Layout;

type Props = {
    options: SideBarOptions[]
}

export default function RootLayout(props: Props) {

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    
      return (
          <Layout style={{minHeight:'100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div style={{height:'32px',borderRadius:'6px', background:'rgba(255,255,255,.2)', margin:'16px'}}>Logo</div>

              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                theme={"dark"}
              >
                {props.options.map((item : SideBarOptions ) => (
                  <Menu.Item key={item?.key} icon={<item.icon/>}>
                    <Link to={`/${item?.path}`}>
                        {item?.label}
                    </Link>
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
            <Layout style={{ padding: '24px' }}>

              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                }}
              >
                <Outlet/>
              </Content>

            </Layout>
          </Layout>
      );
}