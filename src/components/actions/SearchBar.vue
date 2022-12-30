<template>
  <q-input
    color="teal"
    filled
    v-model="text"
    @update:model-value="$emit('typingSearch', text)"
    label="Pesquisar">
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
    </q-input>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: [
    'typingSearch',
  ],

  setup() {
    const text = ref('');

    return {
      text,
    };
  },
});
</script>
