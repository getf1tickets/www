import { styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Table,
  Divider,
  TableRow,
  Container,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
import {
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useRouter } from 'next/router';
import { fCurrency } from '../../utils/formatNumber';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Image from '../../components/Image';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { get } from '../../utils/AsyncApi';
import OrderToolbar from '../../components/order/OrderToolbar';
// import { InvoiceToolbar } from '../../../sections/@dashboard/e-commerce/invoice';

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

export default function OrderDetails() {
  const { query } = useRouter();
  const { id } = query;

  const [order, setOrder] = useState(null);
  const orderId = useMemo(() => `${order?.id}`.split('-')[0].toUpperCase(), [order]);
  const isSuccess = useMemo(() => order?.status === 'completed', [order]);

  const fetchOrder = useCallback(async () => {
    if (!id) return;

    const { error, result } = await get(`/order/${id}`);

    if (error) {
      // todo;
      return;
    }

    setOrder(result);
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return (
    <Page title={order ? `Order n°${orderId}` : 'Loading ...'}>
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Order Details"
        />

        {isSuccess && <OrderToolbar order={order} orderId={orderId} />}

        <Card sx={{ pt: 5, px: 5 }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Image disabledEffect visibleByDefault alt="logo" src="https://fr.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" sx={{ maxWidth: 180 }} />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Box sx={{ textAlign: { sm: 'right' } }}>
                <Label
                  color={
                    (order?.status === 'cancelled' && 'error')
                    || (['waiting_payment', 'created'].includes(order?.status) && 'warning')
                    || 'success'
                  }
                  sx={{ textTransform: 'uppercase', mb: 1 }}
                >
                  {order?.status}
                </Label>
                <Typography variant="h6">
                  n°
                  {orderId}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Invoice from
              </Typography>
              <Typography variant="body2">F1 Tickets</Typography>
              <Typography variant="body2">Formula One</Typography>
              <Typography variant="body2">Phone: (+001) 237 2838</Typography>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
              <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
                Invoice to
              </Typography>
              <Typography variant="body2">{order?.address?.fullName}</Typography>
              <Typography variant="body2">{order?.address?.address}</Typography>
              <Typography variant="body2">
                {order?.address?.zip}
                ,
                {' '}
                {order?.address?.city}
              </Typography>
              <Typography variant="body2">
                Phone:
                {' '}
                {order?.address?.phoneNumber}
              </Typography>
            </Grid>
          </Grid>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 960 }}>
              <Table>
                <TableHead
                  sx={{
                    borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    '& th': { backgroundColor: 'transparent' },
                  }}
                >
                  <TableRow>
                    <TableCell width={40}>#</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Qty</TableCell>
                    <TableCell align="right">Unit price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {order?.products.map((product, index) => (
                    <TableRow
                      key={product.id}
                      sx={{
                        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell align="left">
                        <Box sx={{ maxWidth: 560 }}>
                          <Typography variant="subtitle2">{product.description.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">{product.quantity}</TableCell>
                      <TableCell align="right">{fCurrency(product.description.price)}</TableCell>
                      <TableCell align="right">{fCurrency(product.description.price * product.quantity)}</TableCell>
                    </TableRow>
                  ))}

                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">Subtotal</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Box sx={{ mt: 2 }} />
                      <Typography variant="body1">{fCurrency(order?.subtotal)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="body1">Taxes</Typography>
                    </TableCell>
                    <TableCell align="right" width={120}>
                      <Typography variant="body1">{fCurrency(0)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                  <RowResultStyle>
                    <TableCell colSpan={3} />
                    <TableCell align="right">
                      <Typography variant="h6">Total</Typography>
                    </TableCell>
                    <TableCell align="right" width={140}>
                      <Typography variant="h6">{fCurrency(order?.total)}</Typography>
                    </TableCell>
                  </RowResultStyle>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Divider sx={{ mt: 5 }} />

          <Grid container>
            <Grid item xs={12} sx={{ py: 3, textAlign: 'right' }}>
              <Typography variant="subtitle2">Have a Question?</Typography>
              <Typography variant="body2">support@getf1tickets.com</Typography>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </Page>
  );
}
