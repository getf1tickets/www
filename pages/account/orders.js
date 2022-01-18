/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  Button,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import OrderListHead from '../../components/account/orders/OrderListHead';
import OrderMoreMenu from '../../components/account/orders/OrderMoreMenu';

// import {
//   ProductMoreMenu,
//   ProductListHead,
//   ProductListToolbar,
// } from '../../../sections/@dashboard/e-commerce/product-list';

const TABLE_HEAD = [
  { id: 'orderId', label: 'Order Id', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: '' },
];

export default function EcommerceProductList() {
  const theme = useTheme();

  const [products, setProducts] = useState([
    {
      id: 1, name: 'Hello World', cover: null, price: 100, createdAt: '2021-01-18T00:00:00Z', inventoryType: 'complete',
    },
  ]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [orderBy, setOrderBy] = useState('createdAt');

  const handleClick = (name) => {
    console.log(name);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const isNotFound = !products.length;

  return (
    <Page title="Orders">
      <Container maxWidth="lg">
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OrderListHead
                  headLabels={TABLE_HEAD}
                />

                <TableBody>
                  {products.map((row) => {
                    const {
                      id, name, cover, price, createdAt, inventoryType,
                    } = row;

                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                        sx={{ my: 4 }}
                      >
                        <TableCell style={{ minWidth: 160 }}>
                          #
                          {id}
                        </TableCell>
                        <TableCell style={{ minWidth: 160 }}>{fDate(createdAt)}</TableCell>
                        <TableCell style={{ minWidth: 160 }}>
                          <Label
                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                            color={
                              (inventoryType === 'out_of_stock' && 'error')
                              || (inventoryType === 'low_stock' && 'warning')
                              || 'success'
                            }
                          >
                            {inventoryType || ''}
                          </Label>
                        </TableCell>
                        <TableCell align="right">{fCurrency(price)}</TableCell>
                        <TableCell align="right">
                          <OrderMoreMenu
                            orderId={id}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6}>
                        <Box sx={{ py: 3 }}>
                          {/* <SearchNotFound searchQuery={filterName} /> */}
                        </Box>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, value) => setPage(value)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
