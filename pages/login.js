import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import {
  Box, Stack, Link, Container, Typography,
} from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import Page from '../components/Page';
import Logo from '../components/Logo';
import LoginForm from '../components/login/LoginForm';
import Layout from '../layout';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// eslint-disable-next-line no-use-before-define
Login.getLayout = function getLayout(page) {
  return <Layout noLogo>{page}</Layout>;
};

export default function Login() {
  const smUp = useResponsive('up', 'sm');

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
          <Typography variant="body2" sx={{ mt: { md: -2 } }}>
            Don&apos;t have an account?
            {' '}

            <NextLink href="/register" passHref>
              <Link href variant="subtitle2">Get started</Link>
            </NextLink>
          </Typography>
          )}
        </HeaderStyle>

        <Container maxWidth="sm">
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Sign in
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
              </Box>
            </Stack>

            <LoginForm />

            {!smUp && (
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don&apos;t have an account?
              {' '}
              <NextLink href="/register" passHref>
                <Link href variant="subtitle2">Get started</Link>
              </NextLink>
            </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
