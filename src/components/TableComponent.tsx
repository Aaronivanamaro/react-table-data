import { useState } from 'react';
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
import { columns } from '../data/tableData';
import { Data } from '../interfaces/interfaces';
import useAxiosWithInterval from '../hooks/useAxiosWithInterval';
import { LinearProgress } from '@mui/material';

const TableComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Change the line below if you want to set a new interval. Currently, its value is 15 seconds. 
  // Please set it in miliseconds (ms). Example: 10 seconds === 10000 ms.
  const [delay, setInterval] = useState(15000);
  const { isLoading, rows } = useAxiosWithInterval(delay);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    isLoading ? <LinearProgress /> :
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
                .sort((a: Data, b: Data) => (a.id > b.id) ? 1 : -1)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Data) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {typeof value === 'boolean' ? (value === true ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />)
                              : (value === row['time'] && row.success === true ? new Date(value).toString() : value)}
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

export default TableComponent;