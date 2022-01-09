import { styled } from '@mui/material/styles';
import {
  Box, AppBar, Toolbar, Stack,
} from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import useUser from '../../hooks/useUser';
import { HEADER, NAVBAR } from '../../utils/config';
import AccountPopover from './AccountPopover';
import Iconify from '../../components/Iconify';

const RootStyle = styled(AppBar)(({
  theme,
}) => ({
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
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
    <RootStyle>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >

        {!isDesktop && (
          <Iconify onClick={onOpenSidebar} icon="eva:menu-2-fill" />
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <LanguagePopover />
          <NotificationsPopover />
          <ContactsPopover /> */}
          {isAuthenticated && <AccountPopover />}
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
