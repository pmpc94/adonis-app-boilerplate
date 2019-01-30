<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-container>
          <v-flex xs12>
            <h2>Images: </h2>
            <input type="file" ref="files" multiple v-on:change="handleFileUploads()"/>
          </v-flex>
          <ProductForm :name="name" @onInputName="name = $event"
          :price="price" @onInputPrice="price = $event"
          :categories="categories" :category="category" @onInputCategory="category = $event"
          :description="description" @onInputDescription="description = $event">
        </ProductForm>
        <v-card-actions>
          <v-spacer></v-spacer>
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
import Modal from '@/components/elements/admin/Modal.vue';

export default {
  name: 'ProductAdd',
  data() {
    return {
      name: '',
      categories: ['terrestrial', 'giant', 'dwarf'],
      category: '',
      description: '',
      price: 0,
      loading: false,
      files: ''
    }
  },
  components: {
    ProductForm,
    Modal
  },
  methods: {
    async saveProduct() {
      let formData = new FormData();

      await HTTP().post('/product', {
        name: '',
        description: '',
        category: '',
        price: '',
        images: []
      })
    },
    handleFilesUpload(){
      this.files = this.$refs.files.files;
    }
  }
}
</script>

<style lang="css">
</style>
