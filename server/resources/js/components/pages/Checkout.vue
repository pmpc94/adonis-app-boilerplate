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

    <div v-if="getProducts.length > 0" class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-5 mb-md-0">
            <h2 class="h3 mb-3 text-black">Billing Details</h2>
            <div class="p-3 p-lg-5 border">
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="c_fname" class="text-black">First Name <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="c_fname" name="c_fname">
                </div>
                <div class="col-md-6">
                  <label for="c_lname" class="text-black">Last Name <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="c_lname" name="c_lname">
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-12">
                  <label for="c_address" class="text-black">Address <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="c_address" name="c_address" placeholder="Street address">
                </div>
              </div>

              <div class="form-group">
                <input type="text" class="form-control" placeholder="Apartment, suite, unit etc. (optional)">
              </div>

              <div class="form-group row mb-5">
                <div class="col-md-6">
                  <label for="c_email_address" class="text-black">Email Address <span class="text-danger">*</span></label>
                  <input v-validate="'required|email'" v-model="email" type="text" class="form-control" id="c_email_address" name="c_email_address">
                  <span>{{ errors.first('c_email_address') }}</span>
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
                      <template v-for="product in getProducts">
                        <tr>
                          <td>{{ product.name }} <strong class="mx-2">x</strong> {{ product.quantity }}</td>
                          <td>€{{ product.price * product.quantity }}</td>
                        </tr>
                      </template>
                      <tr>
                        <td class="text-black font-weight-bold"><strong>Cart Subtotal</strong></td>
                        <td class="text-black">€{{ getProducts.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0).toFixed(2) }}</td>
                      </tr>
                      <tr>
                        <td class="text-black font-weight-bold"><strong>Order Total</strong></td>
                        <td class="text-black font-weight-bold"><strong>€{{ getProducts.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0).toFixed(2) }}</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="form-group">
                    <router-link class="btn btn-primary btn-lg py-3 btn-block" tag="li" to="/thank-you">Place Order</router-link>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
        <!-- </form> -->
      </div>
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
import { mapGetters } from 'vuex';
import HTTP from '@/http';

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      address1: '',
      address2: '',
      email: '',
      total_price: 0,
      status: 'created',
      quantity: [],
      product_id: []
    }
  },
  computed: {
    ...mapGetters('cart', [
      'getProducts'
    ])
  },
  methods: {
    purchase() {
      const { data } = HTTP().post('/order', {
        first_name,
        last_name,
        address1,
        address2,
        email,
        total_price,
        status,
        quantity,
        product_id
      });
    const order = data.data;
    console.log("ORDER", order);
    }
  }
}
</script>

<style lang="css">
</style>
