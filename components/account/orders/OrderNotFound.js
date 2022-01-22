import { Paper, Typography } from '@mui/material';

export default function OrderNotFound({ ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for this query.
      </Typography>
    </Paper>
  );
}
