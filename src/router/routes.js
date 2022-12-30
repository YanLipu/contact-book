const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: '/meu-cadastro', component: () => import('pages/MyProfile.vue') },
      { path: '/usuarios', component: () => import('src/pages/UsersList.vue') },
      { path: '/pessoas', component: () => import('src/pages/PeopleList.vue') },
      { path: '/contatos', component: () => import('src/pages/ContactList.vue') },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/LoginLayout.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
