import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useAxios } from '../hooks/useAxios';
import axios from 'axios';
import useInterval from '../hooks/useInterval';

interface Column {
  id: 'id' | 'name' | 'success' | 'message' | 'hostname' | 'time';
  label: string;
  minWidth?: number;
  align?: 'right';
  // format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Id', minWidth: 20 },
  { id: 'name', label: 'Name', minWidth: 30 },
  { id: 'success', label: 'Status', minWidth: 20 },
  {
    id: 'message',
    label: 'Message',
    minWidth: 90,
    align: 'right',
  },
  {
    id: 'hostname',
    label: 'Hostname',
    minWidth: 90,
    align: 'right',
  },
  {
    id: 'time',
    label: 'Time',
    minWidth: 90,
    align: 'right',
    // format: (value: number) => new Date(value).toString(),
  }
];

interface Data {
  id: number;
  name: string;
  success: boolean;
  message: string;
  hostname: string;
  time: number;
}

const API_NAMES = [
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

const DataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState<any>([]);

  useInterval(() => {
    setRows([]);
    API_NAMES.forEach(async (API_NAME: string, index: number) => {
      const api_name = await API_NAME.toLowerCase();
      try {
        const status = await axios(`https://api.factoryfour.com/${api_name}/health/status`);
        const statusObj = await { id: index + 1, name: API_NAME, ...status.data };
        setRows((prevState: any) => [...prevState, statusObj]);
      }
      catch (error: any) {
        let message = await error.response ? `Response Error: ${error.response.status}` : error.request ? 'Request Error' : error.message || 'Error';
        const statusObj = {
          id: index + 1,
          name: API_NAME,
          success: false,
          message,
          hostname: 'Not Available',
          time: 'Not Available'
        };
        setRows((prevState: any) => [...prevState, statusObj]);
      }
    });
  }, 15000);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows !== [] ? rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .sort((a: any, b: any) => (a.id > b.id) ? 1 : -1)
              .map((row: Data) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          { typeof value === 'boolean' ? (value === true ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />)
                            : (value === row['time'] && row.success === true ? new Date(value).toString() : value) }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
              : null
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
};

export default DataTable;