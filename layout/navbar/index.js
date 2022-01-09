import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { Box, Stack, Drawer } from '@mui/material';
import { NAVBAR } from '../../utils/config';
import Scrollbar from '../../components/Scrollbar';
import useResponsive from '../../hooks/useResponsive';
import Logo from '../../components/Logo';
import NavbarAccount from './NavbarAccount';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

export default function NavbarVertical({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useRouter();
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Logo />
        </Stack>

        <NavbarAccount />
      </Stack>

      {/* <NavSectionVertical navConfig={navConfig} isCollapse={isCollapse} /> */}

      <Box sx={{ flexGrow: 1 }} />

      {/* {!isCollapse && <NavbarDocs />} */}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: NAVBAR.DASHBOARD_WIDTH,
        },
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: NAVBAR.DASHBOARD_WIDTH } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
      <Drawer
        open
        variant="persistent"
        PaperProps={{
          sx: {
            width: NAVBAR.DASHBOARD_WIDTH,
            borderRightStyle: 'dashed',
            bgcolor: 'background.default',
            transition: (theme) => theme.transitions.create('width', {
              duration: theme.transitions.duration.standard,
            }),
          },
        }}
      >
        {renderContent}
      </Drawer>
      )}
    </RootStyle>
  );
}
