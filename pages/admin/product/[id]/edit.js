import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import { get } from '../../../../utils/AsyncApi';
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
import ProductNewForm from '../../../../components/product/ProductNewForm';
import useNotification from '../../../../hooks/useNotification';

export default function ProductCreate() {
  const { query } = useRouter();
  const notification = useNotification();

  const { id } = query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = useCallback(async () => {
    if (!id) return;

    const { error, result } = await get(`/product/${id}`);

    if (error) {
      notification.error('An error occurred while fetching product, please try again.');
      return;
    }

    setProduct(result);
    setLoading(false);
  }, [id, setProduct]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <Page title={loading ? 'Loading ...' : `Edit ${product.name}`}>
      <Container maxWidth="lg">
        <HeaderBreadcrumbs heading={loading ? 'Loading ...' : `Edit ${product.name}`} />
        {!loading && <ProductNewForm isEdit currentProduct={product} />}
      </Container>
    </Page>
  );
}
