<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-container>
          <v-img
          :src="currentImage"
          ></v-img>
        <ProductForm :name="name" @onInputName="name = $event"
          :price="price" @onInputPrice="price = $event"
          :categories="categories" :category="category" @onInputCategory="category = $event"
          :description="description" @onInputDescription="description = $event">
        </ProductForm>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="updateProduct" color="success">Save</v-btn>
          <v-btn @click="destroyProduct" color="error">Remove</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-flex>
</v-layout>
</template>

<script>
import HTTP from '@/http/admin';
import ProductForm from '@/components/elements/admin/ProductForm.vue';
import Modal from '@/components/elements/admin/Modal.vue';

export default {
  name: 'Product',
  data() {
    return {
      currentImage: '',
      param_id: '',
      name: '',
      categories: ['terrestrial', 'giant', 'dwarf'],
      category: '',
      description: '',
      price: 0,
      loading: false
    }
  },
  components: {
    ProductForm,
    Modal
  },
  mounted() {
    this.param_id = this.$route.params.id;
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      const { data } = await HTTP().get(`product/${this.param_id}`);
      const currentProduct = data.data;
      this.name = currentProduct.name;
      this.description = currentProduct.description;
      this.category = currentProduct.category;
      this.price = currentProduct.price;
      this.currentImage = currentProduct.thumbnail.url;
    },
    async updateProduct() {
      await HTTP().patch(`product/${this.param_id}`, {
        name: this.name,
        description: this.description,
        category: this.category,
        price: this.price
      });
    },
    async destroyProduct() {
      await HTTP().delete(`product/${this.param_id}`);
    }
  }
}
</script>

<style lang="css">
</style>
