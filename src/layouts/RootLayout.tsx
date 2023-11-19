
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {Link, Outlet} from 'react-router-dom';
import {SideBarOptions} from "./side-bar-options.ts";

const { Content, Sider, Footer } = Layout;

type Props = {
    options: SideBarOptions[]
}

export default function RootLayout(props: Props) {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    
      return (
          <Layout style={{minHeight:'100vh'}}>
            <Sider style={{width:'200', background: colorBgContainer,padding:'10px', borderRadius:'10px'}}>
            <div style={{width:'120',height:'32px',borderRadius:'6px', background:'lightblue', marginBottom:'4px'}}>Logo</div>

              <Menu
                mode="inline"
                style={{ height: '100%', borderRight: 0 }}
                defaultSelectedKeys={['1']}
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
            <Layout style={{ padding: '0 24px 0 24px' }}>
              <Breadcrumb style={{ margin: ' 0 0 12px 5px' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
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
            <Footer style={{ textAlign: 'center' }}>UIR ©2023 Free Palestine</Footer>

            </Layout>
          </Layout>
      );
}