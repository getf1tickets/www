import { styled } from '@mui/material/styles';
import {
  Box, Button, Divider, Typography, Stack, Container,
} from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import useCheckout from '../../hooks/useCheckout';
import Iconify from '../../components/Iconify';
import Page from '../../components/Page';
import Layout from '../../layout';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// eslint-disable-next-line no-use-before-define
CheckoutOrderComplete.getLayout = function getLayout(page) {
  return <Layout onlyLogo>{page}</Layout>;
};

export default function CheckoutOrderComplete() {
  const { push, query } = useRouter();
  const { reset } = useCheckout();

  const handleResetStep = useCallback(() => {
    reset();
    push(`/user/order/${query.orderId || ''}`);
  }, [push, reset, query.orderId]);

  const handleWebsiteClick = useCallback(() => {
    reset();
    push('/');
  }, [push, reset]);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <Page title="Thanks you">
      <RootStyle>
        <Container>
          <Box sx={{ p: 4, maxWidth: 480, margin: 'auto' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" paragraph>
                Thank you for your purchase!
              </Typography>

              <Typography align="left" sx={{ color: 'text.secondary', my: 5 }}>
                We will send you an confirmation email within the next minutes.
                <br />
                {' '}
                <br />
                {' '}
                If you have any question or queries then fell to get in contact us.
                {' '}
                <br />
                {' '}
                <br />
                {' '}
                All the
                best,
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack direction={{ xs: 'column-reverse', sm: 'row' }} justifyContent="space-between" spacing={2}>
              <Button color="inherit" onClick={handleWebsiteClick} startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}>
                Return to website
              </Button>
              <Button
                variant="contained"
                startIcon={<Iconify icon="ant-design:file-pdf-filled" />}
                onClick={handleResetStep}
              >
                Download my tickets
              </Button>
            </Stack>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
