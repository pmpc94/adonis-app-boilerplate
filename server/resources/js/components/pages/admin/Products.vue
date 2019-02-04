<template>
  <v-container grid-list-md text-xs-center>
    <v-card-title style="color: white"
    class="headline purple"
    primary-title
    >
    Products
  </v-card-title>
  <v-list two-line>
    <template v-for="(product, index) in products">
      <v-divider></v-divider>

      <v-list-tile
      :key="index"
      avatar
      @click="goToProductPage(product)"
      >

      <v-list-tile-avatar>
        <img :src="product.thumbnail.url">
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title v-html="product.name + ' (€' + product.price + ')'"></v-list-tile-title>
        <v-list-tile-sub-title v-html="product.category"></v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </template>
</v-list>
<div class="text-xs-center">
  <v-pagination
  color="purple"
  v-model="page"
  :length="Math.ceil(totalPages / 10)"
  ></v-pagination>
</div>
</v-container>
</template>

<script>
import HTTP from '@/http/admin';

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      page: 1,
      totalPages: 1
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      const query = `?page=${this.page}`;
      const { data } = await HTTP().get(`/products${query}`);
      this.products = data.data.data;
      this.totalPages = data.data.total;
    },
    goToProductPage(product) {
      this.$router.push(`/product-section/${product.id}`)
    }
  },
  watch: {
    page() {
      this.fetchProducts();
    }
  }
}
</script>

<style lang="css">
</style>
