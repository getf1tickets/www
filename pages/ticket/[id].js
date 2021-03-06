import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { alpha, styled } from '@mui/material/styles';
import {
  Box, Tab, Card, Grid, Divider, Container, Typography, Button,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import NextLink from 'next/link';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import SkeletonProduct from '../../components/skeleton/SkeletonProduct';
import { del, get } from '../../utils/AsyncApi';
import ProductDetailsCarousel from '../../components/product/ProductDetailsCarousel';
import ProductDetailsSummary from '../../components/product/ProductDetailsSummary';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import useUser from '../../hooks/useUser';
import useNotification from '../../hooks/useNotification';

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Original',
    icon: 'ic:round-verified',
  },
  {
    title: '10 Day Replacement',
    icon: 'eva:clock-fill',
  },
  {
    title: 'Cancelable at any moment',
    icon: 'ic:round-verified-user',
  },
];

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

export default function ProductDetails() {
  const { query, push } = useRouter();
  const { isAdmin } = useUser();
  const notification = useNotification();

  const { id } = query;
  const [product, setProduct] = useState(null);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    const { error, result } = await get(`/product/${id}`);

    if (error) {
      // todo;
      return;
    }

    setProduct(result);
  }, [id, setProduct]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleDelete = useCallback(async () => {
    if (!product) return;

    const { error } = await del(`/product/${id}`);

    if (error) {
      notification.error('An error occurred while deleting product, please try again.');
      return;
    }

    notification.success('Delete success!');
    push('/');
  }, [product, push, notification, id]);

  return (
    <Page title={product ? product.name : 'Loading ...'}>
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading={product ? product.name : 'Loading ...'}
          action={isAdmin && product && (
            <>
              <NextLink href={`/admin/product/${id}/edit`} passHref>
                <Button variant="contained" startIcon={<Iconify icon="eva:edit-2-fill" />}>
                  Edit
                </Button>
              </NextLink>
              <Button sx={{ ml: 2 }} variant="contained" onClick={handleDelete} startIcon={<Iconify icon="ant-design:delete-filled" />}>
                Delete
              </Button>
            </>
          )}
        />

        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <ProductDetailsCarousel product={product} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ProductDetailsSummary
                    product={product}
                    onGotoStep={() => null}
                  />
                </Grid>
              </Grid>
            </Card>

            <Grid container sx={{ my: 8 }}>
              {PRODUCT_DESCRIPTION.map((item) => (
                <Grid item xs={12} md={4} key={item.title}>
                  <Box sx={{
                    my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center',
                  }}
                  >
                    <IconWrapperStyle>
                      <Iconify icon={item.icon} width={36} height={36} />
                    </IconWrapperStyle>
                    <Typography variant="subtitle1" gutterBottom>
                      {item.title}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Card>
              <TabContext value="1">
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList>
                    <Tab disableRipple value="1" label="Description" />
                  </TabList>
                </Box>

                <Divider />

                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    {/* eslint-disable-next-line react/no-children-prop */}
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
              </TabContext>
            </Card>
          </>
        )}

        {!product && <SkeletonProduct />}

        {/* {error && <Typography variant="h6">404 Product not found</Typography>} */}
      </Container>
    </Page>
  );
}
