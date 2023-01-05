<template>
  <q-dialog v-model="showModal" persistent>
      <q-card style="min-width: 380px">
        <q-card-section>
          <div class="text-h6">Alterar senha</div>
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
              type="password"
              v-model="currentPassword"
              label="Senha atual *"
              hint="Senha atual"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Obrigatório']"
            />
            <q-input
              class="col-12"
              filled
              type="password"
              v-model="newPassword"
              label="Nova senha *"
              hint="Nova senha"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Obrigatório']"
            />

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
    'changePassword',
  ],

  setup(prop, { emit }) {
    const showModal = ref(false);

    const currentPassword = ref('');

    const newPassword = ref('');

    const onSubmit = () => {
      const passwordData = {
        password: currentPassword.value,
        newPassword: newPassword.value,
      };
      emit('changePassword', passwordData);
    };

    const onReset = () => {

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
      onSubmit,
      onReset,
      currentPassword,
      newPassword,
    };
  },
});
</script>
