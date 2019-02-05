<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card-title style="color: white"
      class="headline purple"
      primary-title
      >
      Product Information
    </v-card-title>
    <v-card>
      <v-container>
        <v-flex xs12>
          <h2>Images*</h2>
          <input v-validate="'required'" class="hidden" type="file" name="images" id="images" ref="images" multiple v-on:change="handleFileUploads()"/>
          <label class="pointer" for="images"><v-icon class="mr-2">add_to_photos</v-icon>Choose your product's image(s)</label>
          <ul class="removeBullets mb-4">
            <li v-for="(image, index) in this.imageFiles" :key="index"><v-icon @click="removeImageFile(index)" class="pointer" color="red">close</v-icon> {{ image.name }} </li>
          </ul>
          <span>{{ errors.first('images') }}</span>
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
      images: '',
      showDialog: false,
      messageDialog: '',
      titleDialog: '',
      imageFiles: []
    }
  },
  components: {
    ProductForm,
    Dialog
  },
  methods: {
    async saveProduct() {
      const validation = await this.$refs.productForm.validateAll();
      await this.$validator.validateAll();
      if (validation) {
        let formData = new FormData();
        for( var i = 0; i < this.imageFiles.length; i++ ){
          formData.append('image_path[' + i + ']', this.imageFiles[i]);
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
      .then(response => {
        this.titleDialog = 'Success';
        this.messageDialog = 'Your product was successfully created.';
      })
      .catch(error => {
        if (error.response.status === 422) {
          this.titleDialog = 'Invalid product name';
          this.messageDialog = 'You must provide a unique product name.';
        } else {
          this.titleDialog = 'Server Error';
          this.messageDialog = 'Something went wrong. Your product could not be created.';
        }
      })
    } else {
      this.titleDialog = 'Validation Error';
      this.messageDialog = 'Please validate all the fields accordingly.';
    }
    this.showDialog = true;
  },
  handleFileUploads(){
    this.images = this.$refs.images.files;
    const tempArray = Array.from(this.images);
    this.imageFiles = this.imageFiles.length === 0 ? Array.from(this.images) : '';
    for (let i=0; i<tempArray.length; i++) {
      let index = this.imageFiles.indexOf(tempArray[i].name);
      if (index > -1) {
        this.imageFiles.push(tempArray[i]);
      }
    }
  },
  hideDialog() {
    this.showDialog = false;
  },
  preventUndesiredChars(event) {
    (event.keyCode >= 189 && event.keyCode <= 192) ? event.preventDefault() : ''
  },
  removeImageFile(index) {
    this.imageFiles.splice(index,1);
  }
}
}
</script>

<style scoped>
.hidden {
  display: none;
}
.pointer {
  cursor: pointer;
}
.removeBullets {
  list-style-type: none;
}
span {
  color: red;
}
</style>
