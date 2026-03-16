export const menuItems = [
  {
    'icon': 'dashboard',
    'slug': 'main',
    'label': 'Main',
    'isTitle': true,
    'children': [
      {
        'icon': 'User Dashboard',
        'slug': 'dashboards',
        'label': 'Dashboards',
        'url': '/dashboard/ecommerce'
      },
    ],
  },
  {
    'icon': 'apps',
    'slug': 'apps',
    'label': 'Products',
    'isTitle': true,
    'children': [
      {
        'url': '/products/buy-product',
        'icon': 'basket',
        'slug': 'buy-product',
        'label': 'Buy Product'
      },
      {
        'url': '/products/rent-product',
        'icon': 'message',
        'slug': 'pages:apps-chat',
        'label': 'Rent Product',
      },
      {
        'url': '/products/orders',
        'icon': 'message',
        'slug': 'pages:apps-chat',
        'label': 'Orders',
      }
    ],
  },
  {
    'icon': 'apps',
    'slug': 'apps',
    'label': 'Finance',
    'isTitle': true,
    'children': [
      {
        'url': '/products/buy-product',
        'icon': 'basket',
        'slug': 'buy-product',
        'label': 'Buy Product'
      },
      {
        'url': '/apps/chat',
        'icon': 'message',
        'slug': 'pages:apps-chat',
        'label': 'Rent Product',
      }
    ],
  }
]
