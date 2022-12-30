<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Agenda
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    link: '/',
  },
  {
    title: 'Meu cadastro',
    caption: 'Meu cadastro',
    icon: 'code',
    link: '/meu-cadastro',
  },
  {
    title: 'Usuários',
    caption: 'Lista de usuários',
    icon: 'chat',
    link: '/usuarios',
  },
  {
    title: 'Pessoas',
    caption: 'Lista de pessoas',
    icon: 'record_voice_over',
    link: '/pessoas',
  },
  {
    title: 'Contatos',
    caption: 'Lista de contatos',
    icon: 'rss_feed',
    link: '/contatos',
  },
  {
    title: 'Logout',
    caption: 'Sair',
    icon: 'public',
    link: '/login',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
