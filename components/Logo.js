import { forwardRef } from 'react';
import NextLink from 'next/link';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import Image from './Image';

const Logo = forwardRef(({ sx }, ref) => {
  const logo = (
    <Box
      ref={ref}
      sx={{
        width: 40, height: 40, cursor: 'pointer', ...sx,
      }}
    >
      <Image alt="logo" src="https://s3.getf1tickets.com/public/logo.png" />
    </Box>
  );

  return <NextLink href="/">{logo}</NextLink>;
});

Logo.displayName = 'Logo';

export default Logo;
