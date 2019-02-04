<template>
  <div>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0"><router-link to="/">Shop</router-link><span class="mx-2 mb-0">/</span> <strong class="text-black">{{ currentProduct.name }}</strong></div>
        </div>
      </div>
    </div>

    <div v-if="!isLoading" class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img :src="currentImage" alt="" class="img-fluid mb-2">
            <div class="row">
              <div class="col-md-3" v-for="(product, index) in currentProduct.images" :key="index">
                <img :class="{ 'selectedImage': currentImage === product.url}" @click="currentImage = product.url" :src="product.url" alt="Image" class="img-secondary mr-2">
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <h2 class="text-black">{{ currentProduct.name }}</h2>
            <p>{{ currentProduct.category }}</p>
            <p class="mb-4">{{ currentProduct.description }}</p>
            <p><strong class="text-primary h4">€{{ currentProduct.price }}</strong></p>
            <div class="mb-5">
              <div class="input-group mb-3" style="max-width: 120px;">
                <div class="input-group-prepend">
                  <button @click="decrementCount(), currentProduct.quantity = count" class="btn btn-outline-primary js-btn-minus" type="button">&minus;</button>
                </div>
                <input @keydown="preventUndesiredChars" @input="count = parseInt($event.target.value), currentProduct.quantity = count" v-model="count" type="text" min="1" step="1" class="form-control text-center" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                <div class="input-group-append">
                  <button @click="incrementCount(), currentProduct.quantity = count" class="btn btn-outline-primary js-btn-plus" type="button">&plus;</button>
                </div>
              </div>

            </div>
            <button class="buy-now btn btn-sm btn-primary" @click="$root.showModal = true, addToCart(currentProduct)">Add To Cart</button>
          </div>
        </div>
      </div>
    </div>
    <Modal/>
    <div v-if="isLoading" class="spinner-grow centered-page" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</div>
</template>

<script>
import HTTP from '@/http/shop';
import { mapActions } from 'vuex';
import Modal from '@/components/elements/shop/Modal.vue'

export default {
  name: 'Product',
  data () {
    return {
      count: 1,
      currentProduct: '',
      currentImage: '',
      isLoading: true
    }
  },
  mounted() {
    this.fetchProduct(this.$route.params.slug);
  },
  components: {
    Modal
  },
  methods: {
    async fetchProduct(slug) {
      this.isLoading = true;
      await HTTP().get(`/product/${slug}`)
      .then(response => {
        this.currentProduct = response.data.data;
        this.currentProduct['quantity'] = 1;
        this.currentImage = this.currentProduct.thumbnail.url;
        this.isLoading = false;
      })
      .catch(error => {
        this.isLoading = false;
      });
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
    ]),
    teste(eventValue) {
      this.count = parseInt(eventValue);
      this.currentProduct.quantity = this.count;
    }
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
