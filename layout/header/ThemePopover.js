import { useCallback } from 'react';
import { useTheme } from '@mui/material/styles';
import Iconify from '../../components/Iconify';
import useSettings from '../../hooks/useSettings';
import useResponsive from '../../hooks/useResponsive';

export default function CheckoutPopover() {
  const { theme: themeMode, setTheme } = useSettings();
  const theme = useTheme();
  const isDesktop = useResponsive('up', 'lg');

  const handleClick = useCallback(() => {
    setTheme(themeMode === 'dark' ? 'light' : 'dark');
  }, [themeMode, setTheme]);

  return (
    <Iconify onClick={handleClick} icon="gg:dark-mode" width={26} height={26} sx={{ color: isDesktop ? theme.palette.background.invert : '#fff', cursor: 'pointer' }} />
  );
}
