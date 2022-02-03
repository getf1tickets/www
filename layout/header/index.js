import { styled } from '@mui/material/styles';
import {
  Box, AppBar, Toolbar, Stack, Alert,
} from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import useUser from '../../hooks/useUser';
import { HEADER, NAVBAR } from '../../utils/config';
import AccountPopover from './AccountPopover';
import CheckoutPopover from './CheckoutPopover';
import Iconify from '../../components/Iconify';
import ThemePopover from './ThemePopover';

const RootStyle = styled(AppBar)(({
  theme,
}) => ({
  boxShadow: 'none',
  // height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    backgroundColor: theme.palette.background.default,
  },
}));

export default function Header({ onOpenSidebar }) {
  const isDesktop = useResponsive('up', 'lg');
  const { isAuthenticated } = useUser();

  return (
    <RootStyle sx={{ pb: { lg: 2 } }}>
      <Alert severity="warning" sx={{ width: '100%', borderRadius: 0 }}>
        This website is an
        {' '}
        <b>educational</b>
        {' '}
        website.
        {' '}
        <b>We do NOT provide any features, tickets or real payments.</b>
      </Alert>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
          py: 1,
        }}
      >

        {!isDesktop && (
          <Iconify onClick={onOpenSidebar} icon="eva:menu-2-fill" />
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 3 }}>
          <ThemePopover />
          <CheckoutPopover />
          {isAuthenticated && <AccountPopover />}
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
