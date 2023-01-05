<template>
  <q-dialog v-model="showModal" persistent>
      <q-card style="min-width: 580px">
        <q-card-section>
          <div class="text-h6">Novo usuário</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="row q-col-gutter-md"
          >
            <q-input
              class="col-12"
              filled
              v-model="name"
              label="Nome *"
              hint="Nome e sobrenome"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Obrigatório']"
            />

            <q-input
              class="col-6"
              filled
              v-model="email"
              label="Email *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Obrigatório']"
            />

            <q-input
              class="col-6"
              filled
              v-model="cpf"
              mask="###.###.###-##"
              label="CPF *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Obrigatório']"
            />

            <q-input
              class="col-6"
              filled
              type="password"
              v-model="password"
              label="Senha *"
              lazy-rules
              :rules="[
                val => val && val.length > 7 || 'Obrigatório']"
            />

            <q-input
              class="col-6"
              filled
              v-model="phone"
              label="Telefone *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Obrigatório']"
            />

            <q-input
              class="col-6"
              filled
              v-model="username"
              label="Nome de usuário *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Obrigatório']"
            />

            <q-input
              filled
              v-model="date"
              mask="date"
              :rules="['date']"
              label="Data de nascimento"
              hint="Insira a data de nascimento"
              >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-select
            class="col-12"
            filled
            v-model="type"
            :options="options"
            label="Tipo"
            emit-value/>

            <div class="col-12 flex justify-between">
              <q-btn flat label="Cancelar" color="red" v-close-popup />
              <div>
                <q-btn label="Resetar" type="reset" color="primary" flat class="q-ml-sm" />
                <q-btn label="Salvar" type="submit" color="primary"/>
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>
<script>
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    prompt: {
      type: Boolean,
    },
  },

  emits: [
    'saveUser',
  ],

  setup(prop, { emit }) {
    const showModal = ref(false);

    const type = ref('');
    const name = ref('');
    const email = ref('');
    const cpf = ref('');
    const password = ref('');
    const phone = ref('');
    const username = ref('');

    const date = ref(new Date().toJSON().slice(0, 10).replace(/-/g, '/'));

    const options = [
      {
        label: 'Admin',
        value: 'ROLE_ADMIN',
      },
      {
        label: 'Comum',
        value: 'ROLE_USER',
      },
    ];

    const onSubmit = () => {
      const newUser = {
        tipos: [
          type.value,
        ],
        usuario: {
          cpf: cpf.value,
          dataNascimento: date.value.replace(/\//g, '-'),
          email: email.value,
          nome: name.value,
          password: password.value,
          telefone: phone.value,
          username: username.value,
        },
      };
      emit('saveUser', newUser);
    };

    const onReset = () => {
      type.value = '';
      name.value = '';
      email.value = '';
      cpf.value = '';
      password.value = '';
      phone.value = '';
      date.value = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    };

    watch(
      () => prop.prompt,
      () => {
        showModal.value = true;
      },
    );
    return {
      prop,
      showModal,
      emit,
      date,
      options,
      type,
      name,
      email,
      cpf,
      password,
      phone,
      username,
      onSubmit,
      onReset,
    };
  },
});
</script>
