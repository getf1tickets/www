import { Container, Grid } from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import WidgetSummary from '../../components/admin/WidgetSummary';
import OrderChart from '../../components/admin/OrderChart';
import Welcome from '../../components/admin/Welcome';
import { fCurrency, fNumber } from '../../utils/formatNumber';
import useUser from '../../hooks/useUser';
import { get } from '../../utils/AsyncApi';
import useNotification from '../../hooks/useNotification';

export default function ProductCreate() {
  const user = useUser();
  const notification = useNotification();

  const [userStats, setUserStats] = useState(null);
  const [orderStats, setOrdersStats] = useState(null);

  const fetchUserStats = useCallback(async () => {
    const { err, result } = await get('/user/stats');

    if (err) {
      notification.error('An error occurred while fetching user stats, please try again');
      return;
    }

    setUserStats(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchOrderStats = useCallback(async () => {
    const { err, result } = await get('/order/stats');

    if (err) {
      notification.error('An error occurred while fetching user stats, please try again');
      return;
    }

    setOrdersStats(result);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUserStats();
    fetchOrderStats();
  }, [fetchUserStats, fetchOrderStats]);

  return (
    <Page title="Dashboard">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs heading="Dashboard" />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Welcome displayName={user?.info?.name} />
          </Grid>

          <Grid item xs={12} md={4}>
            <WidgetSummary
              title="Total Active Users"
              total={userStats ? userStats.totalActiveUser : '...'}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <WidgetSummary
              title="Total Orders this month"
              total={orderStats ? fNumber(orderStats.orderCount) : '...'}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <WidgetSummary
              title="Total Revenues this month"
              total={orderStats ? fCurrency(orderStats.revenues) : '...'}
            />
          </Grid>

          <Grid item xs={12}>
            <OrderChart data={orderStats?.lastOrders} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
