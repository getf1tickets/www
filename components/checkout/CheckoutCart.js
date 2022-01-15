/* eslint-disable no-unused-vars */
import sum from 'lodash/sum';
import NextLink from 'next/link';
import {
  Grid, Card, Button, CardHeader, Typography,
} from '@mui/material';
// components
import Iconify from '../Iconify';
import Scrollbar from '../Scrollbar';
import EmptyContent from './CheckoutEmpty';
import useCheckout from '../../hooks/useCheckout';
import CheckoutProductList from './CheckoutProductList';
import CheckoutSummary from './CheckoutSummary';

export default function CheckoutCart() {
  const {
    cart,
    increaseProductQuantity,
    decreaseProductQuantity,
    deleteProduct,
    subtotal,
    discount,
    total,
  } = useCheckout();

  const totalItems = sum(cart.map((item) => item.quantity));

  const isEmptyCart = cart.length === 0;

  const handleDeleteCart = (productId) => {
    deleteProduct(productId);
  };

  const handleNextStep = () => {
    console.log('handleNextStep');
  };

  const handleIncreaseQuantity = (productId) => {
    increaseProductQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseProductQuantity(productId);
  };

  const handleApplyDiscount = (value) => {
    console.log('handleApplyDiscount', value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={(
              <Typography variant="h6">
                Card
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;(
                  {totalItems}
                  {' '}
                  item)
                </Typography>
              </Typography>
            )}
            sx={{ mb: 3 }}
          />

          {!isEmptyCart ? (
            <Scrollbar>
              <CheckoutProductList
                products={cart}
                onDelete={handleDeleteCart}
                onIncreaseQuantity={handleIncreaseQuantity}
                onDecreaseQuantity={handleDecreaseQuantity}
              />
            </Scrollbar>
          ) : (
            <EmptyContent
              title="Cart is empty"
              description="Look like you have no items in your shopping cart."
              img="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        <NextLink href="/" passHref>
          <Button color="inherit" startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}>
            Continue Shopping
          </Button>
        </NextLink>
      </Grid>

      <Grid item xs={12} md={4}>
        <CheckoutSummary
          enableDiscount
          total={total}
          discount={discount}
          subtotal={subtotal}
          onApplyDiscount={handleApplyDiscount}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={cart.length === 0}
          onClick={handleNextStep}
        >
          Check Out
        </Button>
      </Grid>
    </Grid>
  );
}
