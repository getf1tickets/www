import { useState } from 'react';
import {
  Container, Tab, Box, Tabs,
} from '@mui/material';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import AccountGeneral from '../../components/account/AccountGeneral';
import AccountBilling from '../../components/account/AccountBilling';
import AccountChangePassword from '../../components/account/AccountChangePassword';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

export default function UserAccount() {
  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      value: 'general',
      icon: <Iconify icon="ic:round-account-box" width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: 'billing',
      icon: <Iconify icon="ic:round-receipt" width={20} height={20} />,
      component: <AccountBilling />,
    },
    {
      value: 'security',
      icon: <Iconify icon="ic:round-vpn-key" width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <Page title="Account">
      <Container maxWidth="lg">
        <HeaderBreadcrumbs
          heading="Settings"
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={tab.value}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
