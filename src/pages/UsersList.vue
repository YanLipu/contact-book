<template>
  <q-page class="row justify-center">
  {{ data }}
  </q-page>
  <FloatAddButtonVue @clickAction="newUserModal = !newUserModal"/>
  <NewUserModal :prompt="newUserModal" @saveUser="saveUser($event)"/>
</template>
<script>
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';
import FloatAddButtonVue from 'src/components/actions/FloatAddButton.vue';
import NewUserModal from 'src/components/NewUserModal.vue';
import { userStore } from '../stores/user-store';

export default defineComponent({
  components: {
    FloatAddButtonVue,
    NewUserModal,
  },
  setup() {
    const user = userStore();

    const newUserModal = ref(false);

    const data = ref('');

    const getData = async () => api.get(`/api/usuario/buscar/${user.getId}`, {
      headers: {
        Authorization: `Bearer ${user.getToken}`,
      },
    });

    onMounted(async () => {
      data.value = await getData();
    });

    const saveUser = async (value) => {
      console.log('value', value);
      await api.post(
        '/api/usuario/salvar',
        {
          ...value,
        },
        {
          headers: {
            Authorization: `Bearer ${user.getToken}`,
          },
        },
      );
      data.value = await getData();
    };

    return {
      data,
      user,
      newUserModal,
      saveUser,
    };
  },
});
</script>
