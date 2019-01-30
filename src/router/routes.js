import store from '../store/index';
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  {
    path: '/items',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/items') }
    ]
  },
  {
    path: '/links',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/links') }
    ]
  },
  {
    path: '/weather',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/weather') }
    ]
  },

  {
    path: '/add',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/add') }
    ],
    beforeEnter: (to, from, next) => {
      if(store.getters['bookmark/isLogged'])
        {next()}
      else
        {next('/')}
      }
  },
  {
    path: '/admin',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/admin') }
    ],
    beforeEnter: (to, from, next) => {
      if(store.getters['bookmark/isLogged'])
        {next()}
      else
        {next('/')}
      }
  },
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
