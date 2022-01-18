import {
  Grid, Stack,
} from '@mui/material';
import useUser from '../../hooks/useUser';
import AccountBillingAddressBook from './AccountBillingAddressBook';

export default function AccountBilling() {
  const { addresses } = useUser();

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={12}>
        <Stack spacing={3}>
          <AccountBillingAddressBook addresses={addresses} />
        </Stack>
      </Grid>
    </Grid>
  );
}
