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

export default function Page404() {
  return (
    <Page title="Page Not Found" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" paragraph>
              Sorry, page not found!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
              Perhaps you&apos;ve mistyped the URL? Be sure to check your spelling.
            </Typography>
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
