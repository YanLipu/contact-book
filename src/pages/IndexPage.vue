<template>
  <q-page class="row justify-center">
    <div class="search-bar col-8 q-pa-md ">
      <SearchBar class="col-6" @typingSearch="search($event)"/>
    </div>
    <div class="contact-box col-8">
      <div class="row justify-between" v-if="data && data.data.length > 0">
        <div class="regular col-6">
          <ContactCard/>
        </div>
        <div class="fav col-6">
          <ContactCard/>
        </div>
      </div>
      <div class="row justify-center" v-else>Sem contatos cadastrados</div>
    </div>
    <FloatAddButton @clickAction="newRegister = !newRegister"/>
  </q-page>
  <NewContactModal :prompt="newRegister"/>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';
import { userStore } from 'src/stores/user-store';
import NewContactModal from 'src/components/NewContactModal.vue';
import SearchBar from '../components/actions/SearchBar.vue';
import FloatAddButton from '../components/actions/FloatAddButton.vue';
import ContactCard from '../components/ContactCard.vue';

export default defineComponent({
  name: 'IndexPage',

  components: {
    SearchBar,
    FloatAddButton,
    ContactCard,
    NewContactModal,
  },

  setup() {
    const user = userStore();

    const data = ref('');

    const newRegister = ref(false);

    onMounted(async () => {
      data.value = await api.get(`/api/contato/listar/${8}`, {
        headers: {
          Authorization: `Bearer ${user.getToken}`,
        },
      });
      console.log('data', data.value);
    });

    const search = async (value) => {
      data.value = await api.post(
        '/api/pessoa/pesquisar',
        {
          nome: value,
        },
        {
          headers: {
            Authorization: `Bearer ${user.getToken}`,
          },
        },
      );
    };
    return {
      data,
      search,
      newRegister,
    };
  },
});
</script>
