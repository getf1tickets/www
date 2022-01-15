import { useState, useMemo, useCallback } from 'react';
import {
  Box, Grid, Card, Button, Typography,
} from '@mui/material';
import { v4 } from 'uuid';
import Iconify from '../Iconify';
import CheckoutSummary from './CheckoutSummary';
import useCheckout from '../../hooks/useCheckout';
import CheckoutNewAddressForm from './CheckoutNewAddressForm';
import useUser from '../../hooks/useUser';

export default function CheckoutBillingAddress() {
  const user = useUser();

  const {
    total,
    discount,
    subtotal,
    previousActiveStep,
    nextActiveStep,
    setBillingAddressId,
  } = useCheckout();

  const [open, setOpen] = useState(false);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleNextStep = useCallback(() => {
    nextActiveStep();
  }, [nextActiveStep]);

  const handleBackStep = useCallback(() => {
    previousActiveStep();
  }, [previousActiveStep]);

  const handleCreateBilling = useCallback((value) => {
    console.log('handleCreateBilling', value);
  }, []);

  const handleSelectAddress = useCallback((id) => {
    setBillingAddressId(id);
    nextActiveStep();
  }, [setBillingAddressId, nextActiveStep]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {user.addresses?.map((address) => (
            <AddressItem
              key={v4()}
              address={address}
              onNextStep={handleNextStep}
              onSelectAddress={handleSelectAddress}
              onDeleteAddress={user.deleteAddress}
            />
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>
            <Button size="small" onClick={handleClickOpen} startIcon={<Iconify icon="eva:plus-fill" />}>
              Add new address
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
        </Grid>
      </Grid>

      <CheckoutNewAddressForm
        open={open}
        onClose={handleClose}
        onNextStep={handleNextStep}
        onCreateBilling={handleCreateBilling}
      />
    </>
  );
}

function AddressItem({
  address: addressProps,
  onSelectAddress,
  onDeleteAddress,
}) {
  const {
    id, fullName, zip, city, country, address, type, phoneNumber,
  } = addressProps;

  const fullAddress = useMemo(
    () => `${address}, ${zip}, ${city}, ${country}`,
    [address, zip, city, country],
  );

  return (
    <Card sx={{ p: 3, mb: 3, position: 'relative' }}>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1">{fullName}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;(
          {type}
          )
        </Typography>
      </Box>
      <Typography variant="body2" gutterBottom>
        {fullAddress}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {phoneNumber}
      </Typography>

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          position: { sm: 'absolute' },
          right: { sm: 24 },
          bottom: { sm: 24 },
        }}
      >
        <Button variant="outlined" size="small" color="inherit" onClick={() => onDeleteAddress(id)}>
          Delete
        </Button>
        <Box sx={{ mx: 0.5 }} />
        <Button variant="outlined" size="small" onClick={() => onSelectAddress(id)}>
          Use this billing Address
        </Button>
      </Box>
    </Card>
  );
}
