<template>
  <div>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0"><router-link to="/">Shop</router-link><span class="mx-2 mb-0">/</span> <strong class="text-black">{{ currentProduct.name }}</strong></div>
        </div>
      </div>
    </div>

    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
          <template v-for="product in currentProduct.images">
            <img v-bind:src="product.url" alt="Image" class="img-fluid">
          </template>
          </div>
          <div class="col-md-6">
            <h2 class="text-black">{{ currentProduct.name }}</h2>
            <p>{{ currentProduct.category }}</p>
            <p class="mb-4">{{ currentProduct.description }}</p>
            <p><strong class="text-primary h4">{{ currentProduct.price }}€</strong></p>
            <div class="mb-5">
              <div class="input-group mb-3" style="max-width: 120px;">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                </div>
                <input type="text" class="form-control text-center" value="1" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                <div class="input-group-append">
                  <button class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                </div>
              </div>

            </div>
            <p><a href="cart.html" class="buy-now btn btn-sm btn-primary">Add To Cart</a></p>

          </div>
        </div>
      </div>
    </div>
    <!-- <app-featured-products></app-featured-products> -->
  </div>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import FeaturedProducts from '@/components/elements/FeaturedProducts.vue';

export default {
  mounted() {
    this.fetchProduct(this.$route.params.id)
  },
  components: {
    appFeaturedProducts: FeaturedProducts,
  },
  computed: {
    ...mapState('products', [
      'currentProduct'
    ])
  },
  methods: {
    ...mapActions('products', [
      'fetchProduct'
    ])
  }
}
</script>

<style lang="css">
</style>
