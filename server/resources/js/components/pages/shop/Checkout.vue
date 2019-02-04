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

    <div v-if="products.length > 0" class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6 mb-5 mb-md-0">
            <h2 class="h3 mb-3 text-black">Billing Details</h2>
            <div class="p-3 p-lg-5 border">
              <div class="form-group row">
                <div class="col-md-6">
                  <label for="c_fname" class="text-black">First Name <span class="text-danger">*</span></label>
                  <input v-validate="'required'" v-model="first_name" type="text" class="form-control" id="c_fname" name="first name" placeholder="ex: Pedro">
                  <span>{{ errors.first('first name') }}</span>
                </div>
                <div class="col-md-6">
                  <label for="c_lname" class="text-black">Last Name <span class="text-danger">*</span></label>
                  <input v-validate="'required'" v-model="last_name" type="text" class="form-control" id="c_lname" name="last name" placeholder="ex: Carolina">
                  <span>{{ errors.first('last name') }}</span>
                </div>
              </div>

              <div class="form-group row">
                <div class="col-md-12">
                  <label for="c_address" class="text-black">Address <span class="text-danger">*</span></label>
                  <input v-validate="'required'" v-model="address1" type="text" class="form-control" id="c_address" name="address" placeholder="ex: Street address">
                  <span>{{ errors.first('address') }}</span>
                </div>
              </div>

              <div class="form-group">
                <input type="text" class="form-control" placeholder="ex: Apartment, suite, unit etc. (optional)">
              </div>

              <div class="form-group row">
                <div class="col-md-6">
                  <label for="c_email_address" class="text-black">Email Address <span class="text-danger">*</span></label>
                  <input v-validate="'required|email'" v-model="email" type="text" class="form-control" id="c_email_address" name="email" placeholder="ex: pedro.carolina@example.pt">
                  <span>{{ errors.first('email') }}</span>
                </div>
              </div>

              <!-- STRIPE -->
              <div class="form-group row">
                <div class="col-md-12">
                  <label for="card-number" class="text-black">
                    Card Number
                    <span class="text-danger">*</span>
                  </label>
                  <div ref="card-number" id="card-number" class="form-control">
                    <!-- Stripe Card Element -->
                  </div>
                  <span class="mt-3">
                    {{ stripeErrors.cardNumber }}</span>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col-md-6">
                    <label for="card-exp" class="text-black">
                      Expiry Date
                      <span class="text-danger">*</span>
                    </label>
                    <div ref="card-exp" id="card-exp" class="form-control">
                      <!-- Stripe Card Expiry Element -->
                    </div>
                    <span class="mt-3">
                      {{ stripeErrors.cardExpiry }}
                    </span>
                  </div>
                  <div class="col-md-6">
                    <label for="card-cvc" class="text-black">
                      CVC
                      <span class="text-danger">*</span>
                    </label>
                    <div ref="card-cvc" id="card-cvc" class="form-control">
                      <!-- Stripe CVC Element -->
                    </div>
                    <span class="mt-3">
                      {{ stripeErrors.cardCvc }}
                    </span>
                  </div>
                </div>
                <!-- STRIPE -->
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

                    <div class="form-group mt-5">
                      <button
                      class="btn btn-primary btn-lg py-3 btn-block"
                      @click="submitPurchase"
                      >
                      Place Order
                    </button>
                    <div v-show="loading">
                      <div class="loader mt-2"></div>
                      <h2 style="text-align:center; color: #7971ea">Loading...</h2>
                    </div>
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
import { mapGetters, mapActions } from 'vuex';
import HTTP from '@/http/shop';

export default {
  name: 'Checkout',
  data() {
    return {
      first_name: undefined,
      last_name: undefined,
      address1: undefined,
      address2: undefined,
      email: undefined,
      quantity: [],
      product_id: [],
      loading: false,
      stripe: null,
      stripeErrors: { cardNumber: '', cardCvc: '', cardExpiry: ''},
      number: '',
      expiry: '',
      cvc: '',
      style: {
        base: {
          color: '#32325d',
          lineHeight: '18px',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4'
          }
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a'
        }
      }
    }
  },
  mounted() {
    this.setupStripe();
  },
  computed: {
    ...mapGetters('cart', [
      'products'
    ])
  },
  methods: {
    setupStripe() {
      const stripe = Stripe(window.stripeKey)
      this.stripe = stripe

      const elements = stripe.elements()
      this.number = elements.create('cardNumber', {
        placeholder: 'ex: 4242 4242 4242 4242',
        style: this.style
      })

      this.expiry = elements.create('cardExpiry', {
        placeholder: 'ex: 01/20',
        style: this.style
      })
      this.cvc = elements.create('cardCvc', {
        placeholder: 'ex: 123',
        style: this.style
      })

      this.number.mount(this.$refs['card-number'])
      this.expiry.mount(this.$refs['card-exp'])
      this.cvc.mount(this.$refs['card-cvc'])

      this.number.on('change', result => {
        this.handleResult(result)
      })

      this.expiry.on('change', result => {
        this.handleResult(result)
      })

      this.cvc.on('change', result => {
        this.handleResult(result)
      })
    },
    async handleResult(result) {
      if (result.token) {
        // Use the token to create a charge or a customer
        // https://stripe.com/docs/charges
        // this.token = result.token.id
        for(let i=0; i<this.products.length; i++) {
          this.quantity.push({ id: this.products[i].id, amount: this.products[i].quantity });
          this.product_id.push(this.products[i].id);
        }
        await HTTP().post('/order', {
          first_name: this.first_name,
          last_name: this.last_name,
          address1: this.address1,
          address2: this.address2,
          email: this.email,
          quantity: this.quantity,
          product_id: this.product_id,
          token: result.token.id
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
      } else if (result.error) {
        if (this.stripeErrors[result.elementType] !== undefined) {
          this.stripeErrors[result.elementType] = result.error.code
        }
        this.loading = false
      } else if (result.complete === true) {
        if (this.stripeErrors[result.elementType] !== undefined) {
          this.stripeErrors[result.elementType] = ''
        }
      }
    },
    async submitPurchase() {
      this.loading = true;
      this.disableFields();
      const validation = await this.$validator.validateAll()
      if (validation) {
        let cardData = {
          name: `${this.first_name} ${this.last_name}`
        }
        const result = await this.stripe.createToken(this.number, cardData)
        this.handleResult(result)
      } else {
        this.loading = false
      }
    },
    disableFields() {
      let inputs = document.getElementsByTagName("input");
      let buttons = document.getElementsByTagName("button");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
      }
      for (let i = 0;i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
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

/**
* The CSS shown here will not be introduced in the Quickstart guide, but shows
* how you can use CSS to style your Element's container.
*/
.StripeElement {
  background-color: white;
  height: 40px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
