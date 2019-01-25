<template>
  <div>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <router-link class="mb-0" tag="a" to="/">Home</router-link>
          <router-link class="mx-2 mb-0" tag="a" to="/cart">/ Cart</router-link>
          <span class="mx-1 mb-0">/</span> <strong class="text-black">Checkout</strong>
        </div>
      </div>
    </div>

    <div v-if="products.length > 0 && !loading" class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-5 mb-md-0">
            <h2 class="h3 mb-3 text-black">Billing Details</h2>
            <div class="p-3 p-lg-5 border">
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="c_fname" class="text-black">First Name <span class="text-danger">*</span></label>
                  <input v-validate="'required'" v-model="first_name" type="text" class="form-control" id="c_fname" name="first name" placeholder="Pedro">
                  <span>{{ errors.first('first name') }}</span>
                </div>
                <div class="col-md-6">
                  <label for="c_lname" class="text-black">Last Name <span class="text-danger">*</span></label>
                  <input v-validate="'required'" v-model="last_name" type="text" class="form-control" id="c_lname" name="last name" placeholder="Carolina">
                  <span>{{ errors.first('last name') }}</span>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-12">
                  <label for="c_address" class="text-black">Address <span class="text-danger">*</span></label>
                  <input v-validate="'required'" v-model="address1" type="text" class="form-control" id="c_address" name="address" placeholder="Street address">
                  <span>{{ errors.first('address') }}</span>
                </div>
              </div>

              <div class="form-group">
                <input type="text" class="form-control" placeholder="Apartment, suite, unit etc. (optional)">
              </div>

              <div class="form-group row mb-5">
                <div class="col-md-6">
                  <label for="c_email_address" class="text-black">Email Address <span class="text-danger">*</span></label>
                  <input v-validate="'required|email'" v-model="email" type="text" class="form-control" id="c_email_address" name="email" placeholder="pedro.carolina@example.pt">
                  <span>{{ errors.first('email') }}</span>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-12">
                  <label for="c_credit_card" class="text-black">Credit Card Number <span class="text-danger">*</span></label>
                  <input v-validate="'required|credit_card'" v-model="credit_card" type="text" class="form-control" id="c_credit_card" name="credit card" placeholder="4242 4242 4242 4242">
                  <span>{{ errors.first('credit card') }}</span>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-6">
                  <label for="c_expiry_date" class="text-black">Expiry Date <span class="text-danger">*</span></label>
                  <input v-validate="'required|date_format:MM/YYYY'" v-model="expiry_date" type="text" class="form-control" id="c_expiry_date" name="expiry date" placeholder="01/2020">
                  <span>{{ errors.first('expiry date') }}</span>
                </div>
                <div class="col-md-6">
                  <label for="c_cvc" class="text-black">CVC <span class="text-danger">*</span></label>
                  <input v-validate="'required'" v-model="cvc" type="text" class="form-control" id="c_cvc" name="cvc" placeholder="123">
                  <span>{{ errors.first('cvc') }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row mb-5">
              <div class="col-md-12">
                <h2 class="h3 mb-3 text-black">Your Order</h2>
                <div class="p-3 p-lg-5 border">
                  <table class="table site-block-order-table mb-5">
                    <thead>
                      <th>Product</th>
                      <th>Total</th>
                    </thead>
                    <tbody>
                      <tr v-for="(product, index) in products" :key="index">
                        <td>{{ product.name }} <strong class="mx-2">x</strong> {{ product.quantity }}</td>
                        <td>€{{ (product.price * product.quantity).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td class="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
                        <td class="text-black">€{{ products.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td class="text-black font-weight-bold"><strong>Order Total</strong></td>
                        <td class="text-black font-weight-bold"><strong>€{{ products.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0).toFixed(2) }}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="form-group">
                    <!-- <button @click="purchase(products)" :disabled="!isComplete || errors.any()" class="btn btn-primary btn-lg py-3 btn-block">Place Order</button> -->
                    <button @click="submitPurchase(products)" class="btn btn-primary btn-lg py-3 btn-block">Place Order</button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
        <!-- </form> -->
      </div>
    </div>

    <div v-else>
      <h2 style="text-align:center; color: #7971ea">Loading...</h2>
      <div class="loader"></div>
    </div>

    <div v-else class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <span class="icon-check_circle display-3 text-success"></span>
            <h2 class="display-3 text-black">Your cart is empty!</h2>
            <p class="lead mb-5">Don't lose our big deals.</p>
            <router-link class="btn btn-sm btn-primary" tag="li" to="/">Back to shop</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import HTTP from '@/http';

export default {
  data() {
    return {
      first_name: undefined,
      last_name: undefined,
      address1: undefined,
      address2: undefined,
      email: undefined,
      total_price: 0,
      status: 'created',
      quantity: [],
      product_id: [],
      credit_card: undefined,
      expiry_date: undefined,
      cvc: undefined,
      loading: false
    }
  },
  computed: {
    ...mapGetters('cart', [
      'products'
    ])
  },
  methods: {
     submitPurchase(products) {
      this.$validator.validate().then(result => {
        if (result) {
         this.purchase(products);
        }
        else {
          //validation will happen magically by VeeValidate
        }
      });
    },
     purchase(products) {
      this.loading = true;
      for(let i=0; i<products.length; i++) {
        this.quantity.push({ id: products[i].id, amount: products[i].quantity });
        this.product_id.push(products[i].id);
      }
        HTTP().post('/order', {
        first_name: this.first_name,
        last_name: this.last_name,
        address1: this.address1,
        address2: this.address2,
        email: this.email,
        total_price: this.total_price,
        status: this.status,
        quantity: this.quantity,
        product_id: this.product_id
      })
      .then(response => {
        this.loading = false;
        this.emptyCart();
        this.$router.push('/thank-you');
      })
      .catch(error => {
        this.loading = false;
        this.$router.push('/error');
      });
    },
    ...mapActions('cart', [
      'emptyCart',
    ])
  }
}
</script>

<style scoped>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #7971ea;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin: 0 auto;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

span {
  color: #7971ea;
}
</style>
