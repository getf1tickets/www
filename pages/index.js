import { useState, useCallback, useEffect } from 'react';
import {
  Container, Stack, Button,
} from '@mui/material';
import NextLink from 'next/link';
import Page from '../components/Page';
import ShopProductList from '../components/shop/ShopProductList';
import { get } from '../utils/AsyncApi';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import useNotification from '../hooks/useNotification';
import Iconify from '../components/Iconify';
import useUser from '../hooks/useUser';

export default function Tickets() {
  const notification = useNotification();
  const { isAdmin } = useUser();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { error, result } = await get('/product');

    if (error) {
      notification.error('An error occurred while fetching tickets, please try again');
      return;
    }

    setLoading(false);
    setProducts(result);
  }, [setProducts, setLoading]); // do not include notification dependency here

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Page title="The easiest way to get tickets">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Tickets"
          action={isAdmin && (
            <NextLink href="/admin/new-product" passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                New Product
              </Button>
            </NextLink>
          )}
        />

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        />

        {/* <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{filteredProducts.length}</strong>
                &nbsp;Products found
              </Typography>

              <ShopTagFiltered
                filters={filters}
                isShowReset={!isDefault && !openFilter}
                onRemoveGender={handleRemoveGender}
                onRemoveCategory={handleRemoveCategory}
                onRemoveColor={handleRemoveColor}
                onRemovePrice={handleRemovePrice}
                onRemoveRating={handleRemoveRating}
                onResetAll={handleResetFilter}
              />
            </>
          )}
        </Stack> */}

        <ShopProductList
          products={products}
          loading={loading}
        />
      </Container>
    </Page>
  );
}
