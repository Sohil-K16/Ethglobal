// Navigation icons - using placeholder icons for now
// In a real app, these would be imported from assets
export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: '🏠', // dashboard icon
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: '➕', // create campaign icon  
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: '💳', // payment icon
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: '💰', // withdraw icon
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: '👤', // profile icon
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: '🚪', // logout icon
    link: '/',
    disabled: true,
  },
];

export const loader = '⏳'; // Loading spinner placeholder