import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import {
  Box, Link, Container, Typography,
} from '@mui/material';
import useResponsive from '../hooks/useResponsive';
import Page from '../components/Page';
import Logo from '../components/Logo';
import RegisterForm from '../components/register/RegisterForm';
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
Register.getLayout = function getLayout(page) {
  return <Layout noLogo>{page}</Layout>;
};

export default function Register() {
  const smUp = useResponsive('up', 'sm');

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo />
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Already have an account?
              {' '}

              <NextLink href="/login" passHref>
                <Link variant="subtitle2">Login</Link>
              </NextLink>
            </Typography>
          )}
        </HeaderStyle>

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Get started absolutely free.
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
              </Box>
            </Box>

            <RegisterForm />

            {/* <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
              By registering, I agree to
              {' '}
              <Link underline="always" color="text.primary" href="true">
                Terms of Service
              </Link>
              {' '}
              and
              {' '}
              <Link underline="always" color="text.primary" href="true">
                Privacy Policy
              </Link>
              .
            </Typography> */}

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?
                {' '}
                <NextLink href="/login" passHref>
                  <Link variant="subtitle2">Login</Link>
                </NextLink>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
