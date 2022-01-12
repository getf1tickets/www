import { Card, Skeleton, Stack } from '@mui/material';

export default function SkeletonProductItem() {
  return (
    <Card>
      <Skeleton variant="rectangular" sx={{ paddingTop: '100%' }} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Skeleton variant="text" sx={{ width: 0.5 }} />
          <Skeleton variant="text" sx={{ width: 50 }} />
        </Stack>
      </Stack>
    </Card>
  );
}
