import { useMemo } from 'react';
import {
  Card, Button, Typography, CardHeader, CardContent,
} from '@mui/material';
import Iconify from '../Iconify';
import useCheckout from '../../hooks/useCheckout';
import useUser from '../../hooks/useUser';

export default function CheckoutBillingInfo({ onBackStep }) {
  const user = useUser();
  const { billingAddressId } = useCheckout();

  const {
    fullName,
    type,
    address,
    zip,
    city,
    country,
    phoneNumber,
  } = useMemo(
    () => user.addresses?.find((addr) => addr.id === billingAddressId),
    [user, billingAddressId],
  );

  const fullAddress = useMemo(
    () => `${address}, ${zip}, ${city}, ${country}`,
    [address, zip, city, country],
  );

  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Billing Address"
        action={(
          <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />} onClick={onBackStep}>
            Edit
          </Button>
        )}
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {fullName}
&nbsp;
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            (
            {type}
            )
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
          {fullAddress}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {phoneNumber}
        </Typography>
      </CardContent>
    </Card>
  );
}
