import { useState } from 'react';
import NextLink from 'next/link';
import { MenuItem, IconButton } from '@mui/material';
import Iconify from '../../Iconify';
import MenuPopover from '../../MenuPopover';

export default function ProductMoreMenu({ orderId }) {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <NextLink href={`/order/${orderId}/download`}>
          <MenuItem sx={{ borderRadius: 1, typography: 'body2' }}>
            <Iconify icon="ant-design:file-pdf-filled" sx={{ mr: 2, width: 24, height: 24 }} />
            Download
          </MenuItem>
        </NextLink>
      </MenuPopover>
    </>
  );
}
