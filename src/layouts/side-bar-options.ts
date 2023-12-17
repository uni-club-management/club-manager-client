import {
    DollarOutlined,
    PieChartOutlined,
    TeamOutlined,
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

export const presidentOptions: MenuProps['items'] = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: React.createElement(PieChartOutlined),
    },
    {
        key: 'members',
        label: 'Members',
        icon: React.createElement(TeamOutlined),
    },
    {
        key: 'events',
        label: 'Events',
        icon: React.createElement(NotificationOutlined),
    },
    {
        key: 'budget',
        label: 'Budget',
        icon: React.createElement(DollarOutlined),
    },
    {
        key: 'meetings',
        label: 'Meetings',
        icon: React.createElement(CalendarOutlined),
    }
]