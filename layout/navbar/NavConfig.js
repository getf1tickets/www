import Iconify from '../../components/Iconify';

const navConfig = [
  {
    subheader: 'general',
    items: [
      {
        title: 'tickets',
        path: '/',
        icon: <Iconify icon="entypo:ticket" />,
      },
      {
        title: 'calendar',
        path: '/calendar',
        icon: <Iconify icon="bi:calendar-date-fill" />,
      },
      {
        title: 'checkout',
        path: '/checkout',
        icon: <Iconify icon="ic:round-shopping-cart-checkout" />,
      },
    ],
  },
  {
    subheader: 'account',
    items: [
      {
        title: 'profile',
        path: '/profile',
        icon: <Iconify icon="ri:profile-fill" />,
      },
      {
        title: 'settings',
        path: '/settings',
        icon: <Iconify icon="akar-icons:settings-vertical" />,
      },
      {
        title: 'billings',
        path: '/billings',
        icon: <Iconify icon="bi:credit-card-fill" />,
      },
    ],
  },
  {
    subheader: 'admin',
    items: [
      {
        title: 'manage',
        path: '/admin',
        icon: <Iconify icon="whh:indexmanager" />,
      },
    ],
  },
  {
    items: [
      {
        title: 'logout',
        path: '/logout',
        icon: <Iconify icon="clarity:logout-solid" />,
      },
    ],
  },
];

export default navConfig;
