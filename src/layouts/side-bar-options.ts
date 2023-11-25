import {
    CalendarOutlined,
    FileOutlined,
    HomeTwoTone,
    NotificationOutlined,
    TeamOutlined,
} from "@ant-design/icons";

export type SideBarOptions = {
    key: string,
    label: string,
    icon: React.ForwardRefExoticComponent<Pick<never, never>> ,
    path: string
}
export const adminOptions: SideBarOptions[] = [
    {
        key: '1',
        label: 'Clubs',
        icon: HomeTwoTone,
        path: 'clubs'
    },
    {
        key: '2',
        label: 'Events',
        icon: NotificationOutlined,
        path: 'events'
    },
    {
        key: '3',
        label: 'Meetings',
        icon: CalendarOutlined,
        path: 'meetings'
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