export interface Data {
    id: number;
    name: string;
    success: boolean;
    message: string;
    hostname: string;
    time: number;
}

export interface Column {
    id: 'id' | 'name' | 'success' | 'message' | 'hostname' | 'time';
    label: string;
    minWidth?: number;
    align?: 'right';
}
