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
            <img :src="currentImage" alt="" class="img-fluid mb-2">
            <div class="row">
              <div class="col-md-3" v-for="(product, index) in currentProduct.images" :key="index">
                <img :class="{ 'selectedImage': currentImage === product.url}" @click="currentImage = product.url" v-bind:src="product.url" alt="Image" class="img-secondary mr-2">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <h2 class="text-black">{{ currentProduct.name }}</h2>
            <p>{{ currentProduct.category }}</p>
            <p class="mb-4">{{ currentProduct.description }}</p>
            <p><strong class="text-primary h4">€{{ (currentProduct.price * count).toFixed(2) }}</strong></p>
            <div class="mb-5">
              <div class="input-group mb-3" style="max-width: 120px;">
                <div class="input-group-prepend">
                  <button @click="decrementCount(), currentProduct.quantity = count" class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                </div>
                <input @keydown="preventUndesiredChars" type="text" min="1" step="1" class="form-control text-center" v-model="count" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                <div class="input-group-append">
                  <button @click="incrementCount(), currentProduct.quantity = count" class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                </div>
              </div>

            </div>
            <!-- <button class="btn btn-primary" @click="this.$root.showModal = true">Add To Cart</button> -->
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
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      count: 1,
      currentProduct: '',
      currentImage: ''
    }
  },
  mounted() {
    this.fetchProduct(this.$route.params.slug);
  },
  methods: {
    async fetchProduct(slug) {
      const { data } = await HTTP().get(`/product/${slug}`);
      this.currentProduct = data.data;
      this.currentProduct["quantity"] = 1;
      this.currentImage = this.currentProduct.thumbnail.url;
    },
    incrementCount() {
      this.count++;
    },
    decrementCount() {
      this.count > 1 ? this.count-- : '';
    },
    preventUndesiredChars(event) {
      (event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 186 && event.keyCode <= 192) ? event.preventDefault() : ''
    },
    ...mapActions('cart', [
      'addToCart',
    ])
  }
}
</script>

<style scoped>
.img-secondary {
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.img-fluid {
  width: 100%;
  height: 350px;
}

.selectedImage {
  border: 2px solid purple;
}

</style>
