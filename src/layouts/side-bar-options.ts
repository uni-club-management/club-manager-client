import {DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";

export type SideBarOptions = {
    key: string,
    label: string,
    icon: React.ForwardRefExoticComponent<Pick<never, never>> ,
    path: string
}
export const adminOptions: SideBarOptions[] = [
    {
        key: '1',
        label: 'Dashboard',
        icon: PieChartOutlined,
        path: 'dashboard'
    },
    {
        key: '2',
        label: 'Users',
        icon: UserOutlined,
        path: 'users'
    },
    {
        key: '3',
        label: 'Products',
        icon: DesktopOutlined,
        path: 'products'
    },
    {
        key: '4',
        label: 'Documents',
        icon: FileOutlined,
        path: 'orders'
    },
    {
        key: '5',
        label: 'Team',
        icon: TeamOutlined,
        path: 'team'
    }
]