<template>
  <q-dialog v-model="showModal" persistent>
      <q-card style="min-width: 550px">
        <q-card-section>
          <div class="text-h6">Novo contato</div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn flat label="Adicionar" v-close-popup />
        </q-card-actions>
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

  setup(prop) {
    const showModal = ref(false);

    const address = ref('');

    watch(
      () => prop.prompt,
      () => {
        showModal.value = true;
      },
    );
    return {
      prop,
      showModal,
      address,
    };
  },
});
</script>
