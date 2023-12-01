import {
    CalendarOutlined,
    HomeOutlined,
    NotificationOutlined,
} from "@ant-design/icons";
import {MenuProps} from "antd";
import React from "react";


export const adminOptions: MenuProps['items'] = [
    {
        key: 'clubs',
        label: 'Clubs',
        icon: React.createElement(HomeOutlined),
    },
    {
        key: 'events',
        label: 'Events',
        icon: React.createElement(NotificationOutlined),
    },
    {
        key: 'meetings',
        label: 'Meetings',
        icon: React.createElement(CalendarOutlined),
    }
]