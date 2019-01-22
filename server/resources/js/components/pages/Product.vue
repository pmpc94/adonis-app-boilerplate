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
          <template v-for="(product, index) in currentProduct.images">
            <img @click="switchSelectedImage(product, index)" v-bind:src="product.url" alt="Image" :class="{ 'img-fluid mb-2': product.thumbnail, 'img-secondary mr-2': !product.thumbnail }">
          </template>
          </div>
          <div class="col-md-6">
            <h2 class="text-black">{{ currentProduct.name }}</h2>
            <p>{{ currentProduct.category }}</p>
            <p class="mb-4">{{ currentProduct.description }}</p>
            <p><strong class="text-primary h4">€{{ currentProduct.price * count }}</strong></p>
            <div class="mb-5">
              <div class="input-group mb-3" style="max-width: 120px;">
                <div class="input-group-prepend">
                  <button @click="decrementCount(), currentProduct.quantity = count" class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                </div>
                <input type="text" class="form-control text-center" v-model="count" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                <div class="input-group-append">
                  <button @click="incrementCount(), currentProduct.quantity = count" class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                </div>
              </div>

            </div>
            <router-link v-on:click.native="addToCart(currentProduct)" class="buy-now btn btn-sm btn-primary" tag="li" to="/cart">Add To Cart</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import HTTP from '@/http';
import { mapMutations } from 'vuex';

export default {
  data () {
    return {
      count: 1,
      currentProduct: '',
      selectedImage: { pos: 0, val: true}
    }
  },
  mounted() {
    this.fetchProduct(this.$route.params.id)
  },
  methods: {
    async fetchProduct(id) {
      const { data } = await HTTP().get(`/products/${id}`);
      this.currentProduct = data.data;
      this.currentProduct["quantity"] = 1
    },
    incrementCount() {
      this.count++;
    },
    decrementCount() {
      this.count--;
    },
    switchSelectedImage(product, index) {
      console.log("INDEX CLICKED", index, product)
    },
    ...mapMutations('cart', [
      'addToCart',
    ]),
  }
}
</script>

<style scoped>
  .img-secondary {
    max-width: 20%;
    width: 15%;
    height: 15%;
    cursor: pointer;
  }
</style>
