import { useState, useCallback, useEffect } from 'react';
import { Container, Stack } from '@mui/material';
import Page from '../components/Page';
import ShopProductList from '../components/shop/ShopProductList';
import { get } from '../utils/AsyncApi';

export default function Tickets() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { error, result } = await get('/product');
    setLoading(false);

    if (error) {
      // todo;
      return;
    }

    setProducts(result);
  }, [setProducts, setLoading]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Page title="Ecommerce: Shop">
      <Container maxWidth="xl">
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

        {/* <CartWidget /> */}
      </Container>
    </Page>
  );
}
