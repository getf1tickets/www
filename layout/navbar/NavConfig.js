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
        title: 'checkout',
        path: '/checkout',
        icon: <Iconify icon="ic:round-shopping-cart-checkout" />,
      },
    ],
  },
  {
    subheader: 'account',
    require: {
      unauthenticated: true,
    },
    items: [
      {
        title: 'login',
        path: '/login',
        icon: <Iconify icon="clarity:login-solid" />,
      },
      {
        title: 'register',
        path: '/register',
        icon: <Iconify icon="bx:bxs-user-plus" />,
      },
    ],
  },
  {
    subheader: 'account',
    require: {
      authenticated: true,
    },
    items: [
      {
        title: 'settings',
        path: '/account/settings',
        icon: <Iconify icon="akar-icons:settings-vertical" />,
      },
      {
        title: 'orders',
        path: '/account/orders',
        icon: <Iconify icon="clarity:shopping-cart-solid" />,
      },
    ],
  },
  {
    subheader: 'admin',
    require: {
      authenticated: true,
      admin: true,
    },
    items: [
      {
        title: 'dashboard',
        path: '/admin',
        icon: <Iconify icon="ant-design:dashboard-filled" />,
      },
    ],
  },
  {
    require: {
      authenticated: true,
    },
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
