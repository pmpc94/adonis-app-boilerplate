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
          <v-img
          :src="currentImage"
          ></v-img>
          <ProductForm ref="productForm" :name="name" @onInputName="name = $event"
          :price="price" @onInputPrice="price = parseFloat($event)|| 0"
          :categories="categories" :category="category" @onInputCategory="category = $event"
          :description="description" @onInputDescription="description = $event">
        </ProductForm>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="updateProduct" color="success">Save</v-btn>
          <v-btn @click="confirmDelete" color="error">Remove</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
    <div class="text-xs-center">
      <v-dialog
      :value="showDialogDelete"
      width="500"
      @input="$emit('onInputChange', $event)"
      >
      <v-card>
        <v-card-title style="color: white"
        class="headline purple"
        primary-title
        >
        Remove Product
      </v-card-title>

      <v-card-text>
        Are you sure do you want to remove your product?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
        color="success"
        dark
        @click="destroyProduct(), showDialogDelete = false"
        >
        Yes
      </v-btn>
      <v-btn
      color="error"
      dark
      @click="showDialogDelete = false"
      >
      No
    </v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</div>
<Dialog @onInputChange="showDialog = $event" @hide="hideDialog()" :dialog="showDialog" :message="messageDialog" :title="titleDialog"></Dialog>
</v-flex>
</v-layout>
</template>

<script>
import HTTP from '@/http/admin';
import ProductForm from '@/components/elements/admin/ProductForm.vue';
import Dialog from '@/components/elements/admin/Dialog.vue';

export default {
  name: 'ProductEdit',
  data() {
    return {
      currentImage: '',
      param_id: '',
      name: '',
      categories: ['terrestrial', 'giant', 'dwarf'],
      category: '',
      description: '',
      price: undefined,
      showDialog: false,
      messageDialog: '',
      titleDialog: '',
      showDialogDelete: false
    }
  },
  components: {
    ProductForm,
    Dialog
  },
  mounted() {
    this.param_id = this.$route.params.id;
    this.fetchProduct();
  },
  methods: {
    async fetchProduct() {
      await HTTP().get(`product/${this.param_id}`)
      .then(response => {
        const currentProduct = response.data.data;
        this.name = currentProduct.name;
        this.description = currentProduct.description;
        this.category = currentProduct.category;
        this.price = currentProduct.price;
        this.currentImage = currentProduct.thumbnail.url;
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.$router.push('/login');
        }
      });
    },
    async updateProduct() {
      const validation = await this.$refs.productForm.validateAll();
      if (validation) {
        await HTTP().patch(`product/${this.param_id}`, {
          name: this.name,
          description: this.description,
          category: this.category,
          price: this.price
        })
        .then(({ response }) => {
          this.titleDialog = 'Success';
          this.messageDialog = 'Your product was successfully updated.';
        })
        .catch(() => {
          this.titleDialog = 'Server Error';
          this.messageDialog = 'Something went wrong. Your product could not be updated.';
        })
      } else {
        this.titleDialog = 'Validation Error';
        this.messageDialog = 'Please validate all the fields accordingly.';
      }
      this.showDialog = true;
    },
    confirmDelete() {
      this.showDialogDelete = true;
    },
    async destroyProduct() {
      await HTTP().delete(`product/${this.param_id}`)
      .then(({ data }) => {
        this.$router.push('/products');
      })
      .catch(() => {
        this.showDialogDelete = false;
        this.showDialog = true;
        this.titleDialog = 'Error';
        this.messageDialog = 'Something went wrong. Your product could not be removed.';
      });
    },
    hideDialog() {
      this.showDialog = false;
    }
  }
}
</script>

<style lang="css">
</style>
