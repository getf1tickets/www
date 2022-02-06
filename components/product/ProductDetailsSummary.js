import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import {
  Box, Stack, Button, Divider, IconButton, Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import Iconify from '../Iconify';
import { FormProvider } from '../form';
import useCheckout from '../../hooks/useCheckout';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

export default function ProductDetailsSummary({
  product, onGotoStep, ...other
}) {
  const { push } = useRouter();

  const {
    id,
    name,
    price,
    available,
    cover,
  } = product;

  const checkout = useCheckout();

  const isMaxQuantity = false;

  const defaultValues = {
    id,
    name,
    available,
    price,
    cover,
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    watch, setValue, handleSubmit,
  } = methods;

  const values = watch();

  const onSubmit = useCallback(async (data) => {
    checkout.setProduct(data, data.quantity);
    checkout.setActiveStep(0);
    push('/checkout');
  }, [checkout, push]);

  const handleAddCart = useCallback(async () => {
    checkout.addProduct(values, values.quantity);
  }, [checkout]);

  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" paragraph>
          {name}
        </Typography>

        <Typography variant="h4" sx={{ mb: 3 }}>
          {price}
          $
        </Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" justifyContent="space-between" sx={{ my: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
            Quantity
          </Typography>

          <div>
            <Incrementer
              name="quantity"
              quantity={values.quantity}
              available={values.available}
              onIncrementQuantity={() => setValue('quantity', values.quantity + 1)}
              onDecrementQuantity={() => setValue('quantity', values.quantity - 1)}
            />
            {/* <Typography variant="caption"
            component="div" sx={{ mt: 1, textAlign: 'right', color: 'text.secondary' }}>
              Available:
              {' '}
              {50}
            </Typography> */}
          </div>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Button
            fullWidth
            disabled={isMaxQuantity}
            size="large"
            color="warning"
            variant="contained"
            startIcon={<Iconify icon="ic:round-add-shopping-cart" />}
            onClick={handleAddCart}
            sx={{ whiteSpace: 'nowrap' }}
          >
            Add to Cart
          </Button>

          <Button fullWidth size="large" type="submit" variant="contained">
            Buy Now
          </Button>
        </Stack>

      </FormProvider>
    </RootStyle>
  );
}

function Incrementer({
  available, quantity, onIncrementQuantity, onDecrementQuantity,
}) {
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton size="small" color="inherit" disabled={quantity <= 1} onClick={onDecrementQuantity}>
        <Iconify icon="eva:minus-fill" width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton size="small" color="inherit" disabled={quantity >= available} onClick={onIncrementQuantity}>
        <Iconify icon="eva:plus-fill" width={14} height={14} />
      </IconButton>
    </Box>
  );
}
