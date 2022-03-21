import { Column } from "../interfaces/interfaces";

export const API_NAMES = [
    'Accounts',
    'Assets',
    'Customers',
    'Datapoints',
    'Devices',
    'Documents',
    'Forms',
    'Invites',
    'Media',
    'Messages',
    'Namespaces',
    'Orders',
    'Patients',
    'Relationships',
    'Rules',
    'Templates',
    'Users',
    'Workflows'
];

export const columns: readonly Column[] = [
    { id: 'name', label: 'Name', minWidth: 30, align: 'left' },
    { id: 'success', label: 'Status', minWidth: 20, align: 'center' },
    {
        id: 'message',
        label: 'Message',
        minWidth: 90,
        align: 'center',
    },
    {
        id: 'hostname',
        label: 'Hostname',
        minWidth: 90,
        align: 'center',
    },
    {
        id: 'time',
        label: 'Time',
        minWidth: 90,
        align: 'center',
    }
];