<template>
  <v-container grid-list-md text-xs-center>
    <h1>Your Products</h1>
    <v-layout row wrap>
      <v-flex xs4 v-for="(product, index) in products" :key="index">
        <v-card>
          <v-img
          :src="product.thumbnail.url"
          ></v-img>
          <v-card-text><h2>{{ product.name }}</h2></v-card-text>
          <v-card-text>{{ product.category }}</v-card-text>
          <v-card-actions>
            <v-btn @click="goToProductPage(product)" color="info">Edit</v-btn>
            <v-btn @click="removeProduct(product)" color="error">Remove</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HTTP from '@/http/admin';

export default {
  name: 'Products',
  data() {
    return {
      products: []
    }
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      const { data } = await HTTP().get(`/products`);
      this.products = data.data;
    },
    goToProductPage(product) {
      this.$router.push(`/product/${product.id}`)
    },
    async removeProduct(product) {
      await HTTP().delete(`/product/${product.id}`)
    }
  }
}
</script>

<style lang="css">
</style>
