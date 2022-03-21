import { useState, useCallback } from 'react';
import useAxiosWithInterval from '../hooks/useAxiosWithInterval';
import useWindowResizeEvent from '../hooks/useWindowResizeEvent';
import { Data } from '../interfaces/interfaces';
import { columns } from '../data/tableData';
import parseDate from '../utils/parseDate';
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
import LinearProgress from '@mui/material/LinearProgress';

const TableComponent = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Change the line below if you want to set a new interval. Currently, its value is 15 seconds. 
  // Please set it in milliseconds (ms). Example: 10 seconds === 10000 ms.
  const [delay, setDelay] = useState(15000);
  const { isLoading, rows } = useAxiosWithInterval(delay);
  const innerWidth = useWindowResizeEvent(); 

  const handleChangePage = useCallback((event: unknown, newPage: number) => setPage(newPage), []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }, []);

  return (
    isLoading ? <LinearProgress /> :
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            { innerWidth < 525 ? null :
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
            }
            <TableBody>
              {rows !== [] ? rows
                .sort((a: Data, b: Data) => (a.id > b.id) ? 1 : -1)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: Data) => {
                  return (
                    innerWidth < 525 ?
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        <td style={{
                          padding: '1rem',
                          borderTop: `solid 0.004px rgba(195, 193, 190, 0.4)`,
                        }}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <div key={column.id} style={{
                                justifyContent: 'left',
                                display: 'flex',
                                gap: '.4rem',
                                margin: 'auto'
                              }}>
                                <div style={{ fontWeight: 'bold' }} >{column.label} :</div>
                                <div key={column.id}>
                                  {typeof value === 'boolean' ? (value === true ? <CheckCircleIcon color='success' sx={{fontSize: '17px'}} /> : <CancelIcon color='error' sx={{fontSize: '17px'}} />)
                                    : (value === row['time'] && row.success === true && typeof value === 'number' ? parseDate(value) : value)}
                                </div>
                              </div>
                            );
                          })}
                        </td>
                      </TableRow>
                      : <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {typeof value === 'boolean' ? (value === true ? <CheckCircleIcon color='success' /> : <CancelIcon color='error' />)
                                : (value === row['time'] && row.success === true && typeof value === 'number' ? parseDate(value) : value)}
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
          labelRowsPerPage={innerWidth < 525 ? "" : "Rows per page:"}
        />
      </Paper>
  )
};

export default TableComponent;