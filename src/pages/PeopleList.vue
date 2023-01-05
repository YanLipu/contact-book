<template>
  <q-page class="row justify-center">
    <div class="search-bar col-8 q-pa-md ">
      <SearchBar class="col-6" @typingSearch="search($event)"/>
    </div>
    <FloatAddButton @clickAction="newRegister = !newRegister"/>
    <NewPeopleModal @savePeople="savePeople($event)" :prompt="newRegister"/>
  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue';
import { api } from 'src/boot/axios';
import { userStore } from 'src/stores/user-store';
import SearchBar from '../components/actions/SearchBar.vue';
import FloatAddButton from '../components/actions/FloatAddButton.vue';
import NewPeopleModal from '../components/NewPeopleModal.vue';

export default defineComponent({
  components: {
    SearchBar,
    FloatAddButton,
    NewPeopleModal,
  },

  setup() {
    const data = ref('');

    const newRegister = ref(false);

    const user = userStore();

    const search = (value) => {
      console.log('value', value);
    };

    const getData = async () => api.get(`/api/pessoa/buscar/${8}`, {
      headers: {
        Authorization: `Bearer ${user.getToken}`,
      },
    });

    onMounted(async () => {
      try {
        data.value = await getData();
      } catch (error) {
        throw new Error(error);
      }
    });

    const savePeople = async (value) => {
      await api.post(
        '/api/pessoa/salvar',
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
      search,
      data,
      newRegister,
      savePeople,
    };
  },
});

</script>
