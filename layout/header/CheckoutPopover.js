import {
  Badge,
} from '@mui/material';
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../components/Iconify';
import useCheckout from '../../hooks/useCheckout';
import useResponsive from '../../hooks/useResponsive';

export default function CheckoutPopover() {
  const { cart } = useCheckout();
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');

  return (
    <NextLink href="/checkout">
      <Badge badgeContent={cart?.length || 0} color="error" sx={{ cursor: 'pointer' }} showZero>
        <Iconify icon="eva:shopping-cart-fill" width={26} height={26} sx={{ color: isDesktop ? theme.palette.background.invert : '#fff' }} />
      </Badge>
    </NextLink>
  );
}
