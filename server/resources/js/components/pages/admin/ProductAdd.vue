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
      price: 0,
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
      const validation = await this.$validator.validateAll();
      if (validation) {
      let postProductObject = {
        name: this.name,
        description: this.description,
        category: this.category,
        price: this.price
      }
      for( var i = 0; i < this.files.length; i++ ){
        postProductObject['image_file[' + i + ']'] = this.files[i];
      }
      console.log("asd", postProductObject)
      await axios.post('/api/product', postProductObject,
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
      this.titleDialog = 'Error';
      this.messageDialog = 'Something went wrong. Your product could not be created.';
    })
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
