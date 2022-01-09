import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import {
  Box, Button, Typography, Container,
} from '@mui/material';
import Page from '../components/Page';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

export default function Page500() {
  return (
    <Page title="Internal Server Error" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" paragraph>
              Internal Server Error
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>There was an error, please try again later.</Typography>
            <NextLink href="/">
              <Button size="large" variant="contained" sx={{ marginTop: '18px' }}>
                Go to Home
              </Button>
            </NextLink>
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
