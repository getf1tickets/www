import merge from 'lodash/merge';
import { useMemo } from 'react';
import {
  Card, CardHeader, Box,
} from '@mui/material';
import ReactApexChart, { BaseOptionChart } from '../chart';

export default function AppAreaInstalled({ data = [] }) {
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: data.map((order) => order.date),
      labels: {
        formatter: (v) => `${v}`,
      },
    },
    yaxis: {
      labels: {
        formatter: (v) => `${v}`,
      },
    },
  });

  const series = useMemo(() => ([
    {
      name: 'count',
      data: data.map((order) => order.orders.length),
    },
  ]), [data]);

  return (
    <Card>
      <CardHeader
        title="Total orders for last 30 days"
      />

      { data && data.length > 0
      && (
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="line" series={series} options={chartOptions} height={450} />
      </Box>
      )}
    </Card>
  );
}
