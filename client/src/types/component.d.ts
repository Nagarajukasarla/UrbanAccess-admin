export interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    value: string;
    style?: React.CSSProperties;
}

export type ChartData = {
    label: string;
    value: number;
};

export interface ChartDataProps {
    data: ChartData[];
}

import { CSSProperties, ReactNode } from 'react';

export interface DashboardCardProps {
    icon: ReactNode;
    title: string;
    value: string | number;
    style?: CSSProperties;
}

export interface ChartDataProps {
    data: Array<ChartData>;
}