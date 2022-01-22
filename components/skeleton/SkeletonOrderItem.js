import { TableRow, Skeleton, TableCell } from '@mui/material';

export default function SkeletonProductItem() {
  return (
    <TableRow>
      <TableCell style={{ minWidth: 160 }}>
        <Skeleton variant="text" sx={{ width: 275 }} />
      </TableCell>
      <TableCell style={{ minWidth: 160 }}>
        <Skeleton variant="text" sx={{ width: 100 }} />
      </TableCell>
      <TableCell style={{ minWidth: 160 }}>
        <Skeleton variant="text" sx={{ width: 75 }} />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="text" sx={{ width: 75 }} />
      </TableCell>
    </TableRow>
  );
}
