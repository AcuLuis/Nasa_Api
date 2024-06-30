const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
    ]
  },
  {
    path: '/CARDS',
    component: () => import('components/auth/Cards_Nasa.vue'),
    props: route => ({ start: route.query.start, end: route.query.end }),
  },
  {
    path: '/NASA',
    component: () => import('components/auth/Nasa_Inicio.vue')
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
