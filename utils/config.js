export const HEADER = {
  MOBILE_HEIGHT: 124,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 92,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
};

export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  AUTH: {
    CLIENT_ID: process.env.NEXT_PUBLIC_API_AUTH_CLIENT_ID,
  },
};

export const LOCAL_STORAGE = {
  AUTH_ENTITY_KEY: 'auth_entity',
  CHECKOUT_KEY: 'checkout',
};
