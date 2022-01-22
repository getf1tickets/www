import { useState, useEffect, useCallback } from 'react';
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination,
  Button,
} from '@mui/material';
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
import { get } from '../../utils/AsyncApi';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import OrderListHead from '../../components/account/orders/OrderListHead';
import OrderMoreMenu from '../../components/account/orders/OrderMoreMenu';
import OrderNotFound from '../../components/account/orders/OrderNotFound';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Iconify from '../../components/Iconify';

const TABLE_HEAD = [
  { id: 'orderId', label: 'Order Id', alignRight: false },
  { id: 'date', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: '' },
];

export default function EcommerceProductList() {
  const theme = useTheme();

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = useCallback((event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, [setRowsPerPage, setPage]);

  const fetchOrders = useCallback(async () => {
    const { error, result } = await get('/user/@me/orders');

    if (error) {
      // todo;
      return;
    }

    setProducts(result);
  }, [setProducts]);

  useEffect(fetchOrders, [fetchOrders]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const isNotFound = !products.length;

  return (
    <Page title="Orders">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Orders"
          action={(
            <NextLink href="/checkout" passHref>
              <Button variant="contained" startIcon={<Iconify icon="ic:round-shopping-cart-checkout" />}>
                Checkout Now
              </Button>
            </NextLink>
          )}
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <OrderListHead
                  headLabels={TABLE_HEAD}
                />

                <TableBody>
                  {products
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id, status, price, createdAt,
                      } = row;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
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
                              (['created', 'cancelled'].includes(status) && 'error')
                              || (status === 'waiting_payment' && 'warning')
                              || 'success'
                            }
                            >
                              {status || ''}
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
                          <OrderNotFound />
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
