import { forwardRef } from 'react';
import Head from 'next/head';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({
  children, title = '', meta, ...other
}, ref) => (
  <>
    <Head>
      <title>{`${title} - F1 Tickets`}</title>
      {meta}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.displayName = 'Page';

export default Page;
