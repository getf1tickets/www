import { useState } from 'react';
import { Box } from '@mui/material';
import { HEADER } from '../utils/config';
import DashboardHeader from './header';

export default function Layout({ children }) {
  // const isDesktop = useResponsive('up', 'lg');
  const [, setOpen] = useState(false);

  return (
    <>
      <DashboardHeader onOpenSidebar={() => setOpen(true)} verticalLayout />

      {/* {isDesktop ? (
        <NavbarHorizontal />
      ) : (
        <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      )} */}

      <Box
        component="main"
        sx={{
          px: { lg: 2 },
          pt: {
            xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
            lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
          },
          pb: {
            xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
            lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
          },
        }}
      >
        {children}
      </Box>
    </>
  );
}
