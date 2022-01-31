import {
  Badge,
} from '@mui/material';
import NextLink from 'next/link';
import Iconify from '../../components/Iconify';
import useCheckout from '../../hooks/useCheckout';

export default function CheckoutPopover() {
  const { cart } = useCheckout();
  return (
    <NextLink href="/checkout">
      <Badge badgeContent={cart?.length || 0} color="error" sx={{ cursor: 'pointer' }} showZero>
        <Iconify icon="eva:shopping-cart-fill" width={26} height={26} />
      </Badge>
    </NextLink>
  );
}
