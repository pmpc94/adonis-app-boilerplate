<template>
  <v-container grid-list-md text-xs-center>
    <v-card-title style="color: white"
    class="headline purple"
    primary-title
    >
    Orders
  </v-card-title>
    <v-list two-line>
      <template v-for="(order, index) in orders">
        <v-divider></v-divider>

        <v-list-tile
        :key="index"
        avatar
        @click="goToOrderPage(order)"
        >

        <v-btn icon>
          <v-icon>shopping_cart</v-icon>
        </v-btn>

        <v-list-tile-content>
          <v-list-tile-title v-html="order.status">
          </v-list-tile-title>
          <v-list-tile-sub-title v-html="order.first_name + ' ' + order.last_name + ' (' + order.receipt_email +')'"></v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
  <div class="text-xs-center">
    <v-pagination
    color="purple"
    v-model="page"
    :length="Math.ceil(orders.length / 10)"
    ></v-pagination>
  </div>
</v-container>
</template>

<script>
import HTTP from '@/http/admin';

export default {
  name: 'Orders',
  data() {
    return {
      orders: [],
      page: 1
    }
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      const query = `?page=${this.page}`;
      const { data } = await HTTP().get(`/orders${query}`);
      this.orders = data.data;
    },
    goToOrderPage(order) {
      this.$router.push(`/order/${order.id}`)
    }
  },
  watch: {
    page() {
      this.fetchOrders();
    }
  }
}
</script>

<style lang="css">
</style>
