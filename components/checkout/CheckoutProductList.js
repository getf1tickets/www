import { styled } from '@mui/material/styles';
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';
import Image from '../Image';
import Iconify from '../Iconify';
import { fCurrency } from '../../utils/formatNumber';

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
}));

export default function CheckoutProductList({
  products, onDelete, onIncreaseQuantity, onDecreaseQuantity,
}) {
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((product) => {
            const {
              id, name, price, cover, quantity, available,
            } = product;
            return (
              <TableRow key={id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      alt="product image"
                      src={cover}
                      sx={{
                        width: 64, height: 64, borderRadius: 1.5, mr: 2,
                      }}
                    />
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                        {name}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell align="left">{fCurrency(price)}</TableCell>

                <TableCell align="left">
                  <Incrementer
                    quantity={quantity}
                    available={available}
                    onDecrease={() => onDecreaseQuantity(id)}
                    onIncrease={() => onIncreaseQuantity(id)}
                  />
                </TableCell>

                <TableCell align="right">{fCurrency(price * quantity)}</TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => onDelete(id)}>
                    <Iconify icon="eva:trash-2-outline" width={20} height={20} />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Incrementer({
  available, quantity, onIncrease, onDecrease,
}) {
  return (
    <Box sx={{ width: 96, textAlign: 'right' }}>
      <IncrementerStyle>
        <IconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Iconify icon="eva:minus-fill" width={16} height={16} />
        </IconButton>
        {quantity}
        <IconButton size="small" color="inherit" onClick={onIncrease} disabled={quantity >= available}>
          <Iconify icon="eva:plus-fill" width={16} height={16} />
        </IconButton>
      </IncrementerStyle>
      {/* <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        available:
        {' '}
        {available}
      </Typography> */}
    </Box>
  );
}
