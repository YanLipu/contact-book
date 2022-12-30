<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
    fab
    icon="add"
    color="primary"
    @click="$emit('clickAction')"/>
  </q-page-sticky>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  emits: [
    'clickAction',
  ],
});
</script>
