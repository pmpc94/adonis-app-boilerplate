<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <h1>Current Order Status: {{ status }}</h1>
      <v-divider></v-divider>
      <v-card>
        <v-form>
          <v-card-text primary-title>Update your Order status</v-card-text>
          <v-container>
            <v-select :items="statusOptions" v-model="status" label="ex: canceled" outline></v-select>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="updateOrder" color="success">Save</v-btn>
            </v-card-actions>
          </v-container>
        </v-form>
      </v-card>
      <!-- <Modal v-if="showModal"></Modal> -->
    </v-flex>
  </v-layout>
</template>

<script>
import HTTP from '@/http/admin';
import Modal from '@/components/elements/admin/Modal.vue';

export default {
  name: 'Order',
  data() {
    return {
      status: '',
      statusOptions: ['canceled', 'paid'],
      loading: false,
      showModal: false,
      modalMessage: ''
    }
  },
  components: {
    Modal
  },
  mounted() {
    this.param_id = this.$route.params.id;
    this.fetchOrder();
  },
  methods: {
    async fetchOrder() {
      const { data } = await HTTP().get(`order/${this.param_id}`);
      const currentOrder = data.data;
      this.status = currentOrder.status;
      if (this.status === 'paid') {
        this.statusOptions.splice(this.statusOptions.indexOf(this.status), 1);
      }
    },
    async updateOrder() {
      await HTTP().patch(`order/${this.param_id}`, {
        status: this.status
      })
      .then(({ data }) => {
        this.modalMessage = 'Your order was successfully updated.';
      })
      .catch(() => {
        this.modalMessage = 'Something went wrong. Your order could not be updated.';
      })
      this.showModal = true;
      this.loading = false;
    }
  }
}
</script>

<style lang="css">
</style>
