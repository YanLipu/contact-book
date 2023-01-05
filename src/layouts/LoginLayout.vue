<template>
  <div class="q-pa-md row items-start flex-center">
    <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">Login</div>
    </q-card-section>
    <q-card-section>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <q-input
          filled
          v-model="username"
          label="Seu username *"
          hint="Username"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Obrigatório']"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Senha *"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Obrigatório'
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { api } from 'src/boot/axios';
import { useRouter } from 'vue-router';
import { userStore } from '../stores/user-store';

const useRouterCustom = () => {
  const router = useRouter();

  const goToRoot = () => {
    router.push('/');
  };

  return {
    goToRoot,
  };
};

const user = userStore();

const username = ref();

const password = ref();

export default defineComponent({
  name: 'LoginLayout',

  setup() {
    const { goToRoot } = useRouterCustom();
    const onSubmit = async () => {
      const result = await api.post(
        '/api/auth/login',
        {
          username: username.value,
          password: password.value,
        },
      );
      if (result.status === 200) {
        user.setToken(result.data.accessToken);
        user.setId(result.data.id);
        goToRoot();
      }
    };
    return {
      onSubmit,
      password,
      username,
      goToRoot,
    };
  },
});
</script>
