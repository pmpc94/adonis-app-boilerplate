<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card-title style="color: white"
      class="headline purple"
      primary-title
      >
      Order Information
    </v-card-title>
      <v-divider></v-divider>
      <v-card>
        <v-form>
          <v-card-text primary-title>This order was fulfilled by {{ first_name }} {{ last_name }} <span class="purple-span">({{ email }})</span></v-card-text>
          <v-divider></v-divider>
          <v-card-text primary-title>Update your Order status (currently set to <span class="purple-span">{{ currentCategory }}</span>)</v-card-text>
          <v-container>
            <v-select name="category" v-validate="'required'" :items="categoryOptions" v-model="category" label="ex: canceled" outline></v-select>
            <span>{{ errors.first('category') }}</span>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn :disabled="category === currentCategory" @click="updateOrder" color="success">Save</v-btn>
            </v-card-actions>
            <v-list two-line>
              <template v-for="(product, index) in products">
                <v-divider></v-divider>
                <v-list-tile
                :key="index"
                avatar
                @click="goToProductPage(product)"
                >

                <v-btn icon>
                  <v-icon>shopping_basket</v-icon>
                </v-btn>

                <v-list-tile-content>
                  <v-list-tile-title v-html="'Product: ' + product.name">
                  </v-list-tile-title>
                  <v-list-tile-sub-title v-html="'Quantity: ' + product.quantity + ' (€' + product.price + ')'"></v-list-tile-sub-title>
                  <v-list-tile-sub-title v-html="'Total: €' + (product.quantity * product.price).toFixed(2)"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
          </v-list>
        </v-container>
      </v-form>
    </v-card>
    <Dialog @onInputChange="showDialog = $event" @hide="hideDialog()" :dialog="showDialog" :message="messageDialog" :title="titleDialog"></Dialog>
  </v-flex>
</v-layout>
</template>

<script>
import HTTP from '@/http/admin';
import Dialog from '@/components/elements/admin/Dialog.vue';

export default {
  name: 'Order',
  data() {
    return {
      category: '',
      first_name: '',
      last_name: '',
      email: '',
      currentCategory: '',
      products: [],
      categoryOptions: ['canceled', 'created', 'paid'],
      showDialog: false,
      messageDialog: '',
      titleDialog: ''
    }
  },
  components: {
    Dialog
  },
  mounted() {
    this.param_id = this.$route.params.id;
    this.fetchOrder();
  },
  methods: {
    async fetchOrder() {
      await HTTP().get(`order/${this.param_id}`)
      .then(response => {
        const currentOrder = response.data.data;
        this.first_name = currentOrder.first_name;
        this.last_name = currentOrder.last_name;
        this.email = currentOrder.receipt_email;
        this.category = currentOrder.status;
        this.currentCategory = currentOrder.status;
        this.products = currentOrder.orderProducts;
        if (this.currentCategory === 'canceled') {
          this.categoryOptions.splice(this.categoryOptions.indexOf('created'), 1);
          this.categoryOptions.splice(this.categoryOptions.indexOf('paid'), 1);
        }
        else if (this.currentCategory === 'paid') {
          this.categoryOptions.splice(this.categoryOptions.indexOf('created'), 1);
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          this.$router.push('/login');
        }
      });

    },
    async updateOrder() {
      const validation = await this.$validator.validateAll();
      if (validation) {
        await HTTP().patch(`order/${this.param_id}`, {
          status: this.category
        })
        .then(response => {
          this.titleDialog = 'Success';
          this.messageDialog = 'Your order was successfully updated.';
        })
        .catch(error => {
            this.titleDialog = 'Server Error';
            this.messageDialog = 'Something went wrong. Your order could not be updated.';
        })
      } else {
        this.titleDialog = 'Validation Error';
        this.messageDialog = 'Please validate all the fields accordingly.';
      }
      this.showDialog = true;
    },
    hideDialog() {
      this.showDialog = false;
    },
    goToProductPage(product) {
      this.$router.push(`/product-section/${product.id}`)
    }
  }
}
</script>

<style scoped>
span {
  color: red;
}
.purple-span {
  color: purple;
}
</style>
