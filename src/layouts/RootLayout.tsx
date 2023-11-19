import React from 'react';
import { DesktopOutlined, FileOutlined, LaptopOutlined, NotificationOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content, Sider, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  
  const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
      getItem('Tom', '3'),
      getItem('Bill', '4'),
      getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
  ];
  
type Props = {}

export default function RootLayout({}: Props) {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    
      return (
          <Layout style={{padding: '12px', minHeight:'100vh'}}>
            <Sider style={{width:'200', background: colorBgContainer, height:'fit-content', padding:'5px', borderRadius:'10px'}}>
            <div style={{width:'120',height:'32px',borderRadius:'6px', background:'grey'}}>Logo</div>

              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
                items={items}
              />
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