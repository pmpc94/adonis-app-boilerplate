<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-container>
          <v-flex xs12>
            <h2>Images: </h2>
            <input type="file" name="files" ref="files" multiple v-on:change="handleFileUploads()"/>
          </v-flex>
          <ProductForm ref="productForm" :name="name" @onInputName="name = $event"
          :price="price" @onInputPrice="price = parseFloat($event)|| 0" @preventUndesiredChars="preventUndesiredChars($event)"
          :categories="categories" :category="category" @onInputCategory="category = $event"
          :description="description" @onInputDescription="description = $event">
        </ProductForm>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="saveProduct" color="success">Save</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
    <Dialog @onInputChange="showDialog = $event" @hide="hideDialog()" :dialog="showDialog" :message="messageDialog" :title="titleDialog"></Dialog>
  </v-flex>
</v-layout>
</template>

<script>
import axios from 'axios';
import store from '@/store/admin';
import ProductForm from '@/components/elements/admin/ProductForm.vue';
import Dialog from '@/components/elements/admin/Dialog.vue';

export default {
  name: 'ProductAdd',
  data() {
    return {
      name: '',
      categories: ['terrestrial', 'giant', 'dwarf'],
      category: '',
      description: '',
      price: undefined,
      files: '',
      showDialog: false,
      messageDialog: '',
      titleDialog: ''
    }
  },
  components: {
    ProductForm,
    Dialog
  },
  methods: {
    async saveProduct() {
      // const validation = await this.$refs.productForm.validateAll();
      if (true) {
        let formData = new FormData();
        for( var i = 0; i < this.files.length; i++ ){
          formData.append('image_path[' + i + ']', this.files[i]);
        }
        formData.append('name', this.name);
        formData.append('description', this.description);
        formData.append('category', this.category);
        formData.append('price', this.price);
        await axios.post('/api/product', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${store.state.authentication.token}`
          }
        }
      )
      .then(({ data }) => {
        this.titleDialog = 'Success';
        this.messageDialog = 'Your product was successfully created.';
      })
      .catch(() => {
        this.titleDialog = 'Server Error';
        this.messageDialog = 'Something went wrong. Your product could not be created.';
      })
    } else {
      this.titleDialog = 'Validation Error';
      this.messageDialog = 'Please validate all the fields accordingly.';
    }
    this.showDialog = true;
  },
  handleFileUploads(){
    this.files = this.$refs.files.files;
    console.log("files", this.files)
  },
  hideDialog() {
    this.showDialog = false;
  },
  preventUndesiredChars(event) {
    (event.keyCode >= 189 && event.keyCode <= 192) ? event.preventDefault() : ''
  }
}
}
</script>

<style lang="css">
</style>
