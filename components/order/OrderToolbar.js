import { useState, useEffect } from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { styled } from '@mui/material/styles';
import {
  Box, Tooltip, IconButton, DialogActions, Button,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../Iconify';
import OrderPDF from './OrderPDF';
import DialogAnimate from '../animate/DialogAnimate';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(5),
}));

export default function OrderToolbar({ orderId, order, ...other }) {
  const [openPDF, setOpenPDF] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleOpenPreview = () => {
    setOpenPDF(true);
  };

  const handleClosePreview = () => {
    setOpenPDF(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <RootStyle {...other}>
      <Button
        color="info"
        size="small"
        variant="contained"
        onClick={handleOpenPreview}
        endIcon={<Iconify icon="eva:eye-fill" />}
        sx={{ mx: 1 }}
      >
        Preview
      </Button>

      {isClient && (
      <PDFDownloadLink
        document={<OrderPDF order={order} orderId={orderId} />}
        fileName={`n°${orderId}`}
        style={{ textDecoration: 'none' }}
      >
          {({ loading }) => (
            <LoadingButton
              size="small"
              loading={loading}
              variant="contained"
              loadingPosition="end"
              endIcon={<Iconify icon="eva:download-fill" />}
            >
              Download
            </LoadingButton>
          )}
      </PDFDownloadLink>
      )}

      <DialogAnimate fullScreen open={openPDF}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={handleClosePreview}>
                <Iconify icon="eva:close-fill" />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <OrderPDF order={order} orderId={orderId} />
            </PDFViewer>
          </Box>
        </Box>
      </DialogAnimate>

    </RootStyle>
  );
}
