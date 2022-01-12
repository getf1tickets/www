import NextLink from 'next/link';
import {
  Box, Card, Link, Typography, Stack,
} from '@mui/material';
import Label from '../Label';
import Image from '../Image';

export default function ShopProductCard({ product }) {
  const {
    id, name, cover, status, priceSale, price,
  } = product;

  const linkTo = `ticket/${id}`;

  return (
    <Card>
      <NextLink href={linkTo} passHref>
        <Link color="inherit">
          <Box sx={{ position: 'relative' }}>
            {status && (
            <Label
              variant="filled"
              color={(status === 'out of stock' && 'error') || 'info'}
              sx={{
                top: 16,
                right: 16,
                zIndex: 9,
                position: 'absolute',
                textTransform: 'uppercase',
              }}
            >
              {status}
            </Label>
            )}
            <Image alt={name} src={cover} ratio="6/4" />
          </Box>
        </Link>
      </NextLink>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <NextLink href={linkTo} passHref>
            <Link color="inherit">
              <Typography variant="h5" noWrap>
                {name}
              </Typography>
            </Link>
          </NextLink>

          <Stack direction="row" spacing={0.5}>
            {priceSale && (
              <Typography component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
                {priceSale}
              </Typography>
            )}

            <Typography variant="caption">
              Starting at
              {' '}
              $
              {price}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
