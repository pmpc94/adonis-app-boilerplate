<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-container>
          <ProductForm :name="name" @onInputName="name = $event"
            :price="price" @onInputPrice="price = $event"
            :categories="categories" :category="category" @onInputCategory="category = $event"
            :description="description" @onInputDescription="description = $event">
          </ProductForm>
          <v-card-actions>
            <v-btn @click="saveProduct" color="success">Save</v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import HTTP from '@/http/admin';
import ProductForm from '@/components/elements/admin/ProductForm.vue';

export default {
  name: 'ProductAdd',
  data() {
    return {
      name: '',
      categories: ['terrestrial', 'giant', 'dwarf'],
      category: '',
      description: '',
      price: 0
    }
  },
  components: {
    ProductForm
  },
  methods: {
    async saveProduct() {
      await HTTP().post('/product', {
        name: '',
        description: '',
        category: '',
        price: '',
        images: []
      })
    }
  }
}
</script>

<style lang="css">
</style>
