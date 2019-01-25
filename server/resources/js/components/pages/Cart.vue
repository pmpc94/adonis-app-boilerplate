<template>
  <div>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <router-link class="mb-0" tag="a" to="/">Home</router-link><span class="mx-2 mb-0">/</span> <strong class="text-black">Cart</strong>
        </div>
      </div>
    </div>

    <div v-if="products.length > 0" class="site-section">
      <div class="container">
        <div class="row mb-5">
          <form class="col-md-12" method="post">
            <div class="site-blocks-table">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th class="product-thumbnail">Image</th>
                    <th class="product-name">Product</th>
                    <th class="product-price">Price</th>
                    <th class="product-quantity">Quantity</th>
                    <th class="product-total">Total</th>
                    <th class="product-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(product, index) in products" :key="index">
                      <td class="product-thumbnail">
                        <img :src="product.thumbnail.url" alt="Image" class="img-fluid">
                      </td>
                      <td class="product-name">
                        <router-link tag="a" :to="`/product/${product.slug}`"><h2 class="h5">{{ product.name }}</h2></router-link>
                      </td>
                      <td>€{{ product.price }}</td>
                      <td>
                        <div class="input-group mb-3" style="max-width: 120px; margin: 0 auto;">
                          <div class="input-group-prepend">
                            <button @click="updateCart(product), product.quantity > 1 ? $set(products[index], product.quantity, product.quantity--) : ''" class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                          </div>
                          <input @keydown="preventUndesiredChars" type="text" class="form-control text-center" v-model="product.quantity" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
                          <div class="input-group-append">
                            <button @click="updateCart(product), $set(products[index], product.quantity, product.quantity++)" class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                          </div>
                        </div>

                      </td>
                      <td>{{ (product.price * product.quantity).toFixed(2) }}</td>
                      <td @click="removeFromCart(product)"><span class="btn btn-primary btn-sm">X</span></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="row mb-5">
              <div class="col-md-6">
                <router-link class="btn btn-primary btn-sm btn-block" tag="li" to="/">Continue Shopping</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-6 pl-5">
            <div class="row justify-content-end">
              <div class="col-md-7">
                <div class="row">
                  <div class="col-md-12 text-right border-bottom mb-5">
                    <h3 class="text-black h4 text-uppercase">Cart Totals</h3>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-6">
                    <span class="text-black">Subtotal</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black">€{{ products.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0).toFixed(2) }}</strong>
                  </div>
                </div>
                <div class="row mb-5">
                  <div class="col-md-6">
                    <span class="text-black">Total</span>
                  </div>
                  <div class="col-md-6 text-right">
                    <strong class="text-black">€{{ products.reduce((accumulator, currentValue) => accumulator + (currentValue.price * currentValue.quantity), 0).toFixed(2) }}</strong>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <router-link class="btn btn-primary btn-lg py-3 btn-block" tag="li" to="/checkout">Proceed To Checkout</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default {
  computed: {
    ...mapGetters('cart', [
      'products'
    ])
  },
  methods: {
    ...mapActions('cart', [
      'updateCart',
      'removeFromCart'
    ]),
    preventUndesiredChars() {
      (event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 186 && event.keyCode <= 192) ? event.preventDefault() : ''
    }
  }
}
</script>

<style lang="css">
</style>
