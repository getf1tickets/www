import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box, Card, Typography, Stack,
} from '@mui/material';
import { fNumber, fPercent } from '../../utils/formatNumber';
import Iconify from '../Iconify';
import ReactApexChart from '../chart';

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

export default function AppWidgetSummary({
  title, percent, total, chartColor, chartData,
}) {
  const theme = useTheme();

  const chartOptions = {
    colors: [chartColor],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => '',
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{
      display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3,
    }}
    >
      <Box sx={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <Typography variant="subtitle2">{title}</Typography>

        {percent && (
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <IconWrapperStyle
            sx={{
              ...(percent < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Iconify width={16} height={16} icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {percent > 0 && '+'}
            {fPercent(percent)}
          </Typography>
        </Stack>
        )}

        <Typography variant="h3" sx={{ ...(!percent && { mt: 1 }) }}>{total}</Typography>
      </Box>

      {chartData && <ReactApexChart type="bar" series={[{ data: chartData }]} options={chartOptions} width={60} height={36} />}
    </Card>
  );
}