import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardHeader from './header';
import NavbarVertical from './navbar';
import { HEADER, NAVBAR } from '../utils/config';
import Logo from '../components/Logo';

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

const OnlyLogoStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

export default function Layout({ children, onlyLogo = false, noLogo = false }) {
  // const isDesktop = useResponsive('up', 'lg');
  const [open, setOpen] = useState(false);

  if (onlyLogo) {
    return (
      <>
        <OnlyLogoStyle>
          <Logo />
        </OnlyLogoStyle>
        {children}
      </>
    );
  }

  if (noLogo) {
    return children;
  }

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader onOpenSidebar={() => setOpen(true)} />

      <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <MainStyle>
        {children}
      </MainStyle>
    </Box>
  );
}
