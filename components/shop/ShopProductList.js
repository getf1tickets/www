import { Box } from '@mui/material';
import { v4 } from 'uuid';
import SkeletonProductItem from '../skeleton/SkeletonProductItem';
import ShopProductCard from './ShopProductCard';

export default function ShopProductList({ products, loading }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
      }}
    >
      {(
        loading ? [...Array(12)]
          : products)
        .map((
          product,
        ) => (product
          ? <ShopProductCard key={product.id} product={product} />
          : <SkeletonProductItem key={v4()} />))}
    </Box>
  );
}
