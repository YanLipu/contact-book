<template>
  <q-page class="row justify-center">
    <div class="col-8 row items-center">
      <div class="row justify-evenly"
      style="width: 100%; row-gap: 10px;">
        <div class="row col-12 justify-evenly">
          <span class="col-5 text-weight-bolder">Meu cadastro</span>
          <q-btn
            class="col-5"
            @click="changePassword = !changePassword"
            color="warning"
            label="Alterar senha" />
        </div>
        <q-input class="col-5" outlined v-model="data.nome" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-input class="col-5" outlined v-model="data.email" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="alternate_email" />
          </template>
        </q-input>
        <q-input class="col-5" outlined v-model="data.dataNascimento" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="event" />
          </template>
        </q-input>
        <q-input class="col-5" outlined v-model="data.cpf" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="123" />
          </template>
        </q-input>
        <q-input class="col-5" outlined v-model="data.telefone" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="call" />
          </template>
        </q-input>
        <q-input class="col-5" outlined v-model="data.username" :dense="dense">
          <template v-slot:prepend>
            <q-icon name="abc" />
          </template>
        </q-input>
        <q-btn @click="updateData()" class="col-5" color="primary" label="Salvar" />
      </div>
    </div>
  </q-page>
  <ChangePassword @changePassword="changePasswordFunc($event)" :prompt="changePassword"/>
</template>
<script>
import {
  defineComponent, reactive, toRefs, onMounted,
} from 'vue';
import { api } from 'src/boot/axios';
import { userStore } from 'src/stores/user-store';
import ChangePasswordModal from 'src/components/ChangePasswordModal.vue';

export default defineComponent({
  components: {
    ChangePassword: ChangePasswordModal,
  },
  setup() {
    const user = userStore();
    const state = reactive({
      data: {
        nome: '',
        email: '',
        cpf: '',
        dataNascimento: '',
        username: '',
      },
      text: 'José Yan',
      dense: false,
      changePassword: false,
    });

    async function getData() {
      try {
        const response = await api.get(`/api/usuario/buscar/${user.getId}`, {
          headers: {
            Authorization: `Bearer ${user.getToken}`,
          },
        });
        state.data = response.data.object.usuario;
      } catch (error) {
        throw new Error(error);
      }
    }

    async function changePasswordFunc(data) {
      try {
        await api.post(
          '/api/usuario/alterarSenha',
          {
            ...data,
            username: state.data.username,
          },
          {
            headers: {
              Authorization: `Bearer ${user.getToken}`,
            },
          },
        );
        state.changePassword = false;
      } catch (error) {
        throw new Error(error);
      }
    }

    async function updateData() {
      try {
        const response = await api.put(
          '/api/usuario/atualizar',
          {
            ...state.data,
          },
          {
            headers: {
              Authorization: `Bearer ${user.getToken}`,
            },
          },
        );
        state.data = response.data.object.usuario;
      } catch (error) {
        throw new Error(error);
      }
    }

    onMounted(async () => {
      await getData();
    });
    return {
      ...toRefs(state),
      getData,
      changePasswordFunc,
      updateData,

    };
  },
});
</script>
