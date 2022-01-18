import {
  Card, Typography, Stack, Paper,
} from '@mui/material';

export default function AccountBillingAddressBook({ addresses }) {
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3} alignItems="flex-start">
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Billing Info
        </Typography>

        {addresses.map((address) => (
          <Paper
            key={address.id}
            sx={{
              p: 3,
              width: 1,
              bgcolor: 'background.neutral',
            }}
          >
            <Typography variant="subtitle1" gutterBottom>
              {address.name}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Address: &nbsp;
              </Typography>
              {`${address.address}, ${address.city}, ${address.zip} ${address.country}`}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <Typography variant="body2" component="span" sx={{ color: 'text.secondary' }}>
                Phone: &nbsp;
              </Typography>
              {address.phoneNumber}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Card>
  );
}
