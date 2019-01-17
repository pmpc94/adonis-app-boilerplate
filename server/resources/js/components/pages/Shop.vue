<template>
  <div>
    <div class="site-section">
      <div class="container">

        <div class="row mb-5">
          <div class="col-md-9 order-2">

            <div class="row">
              <div class="col-md-12 mb-5">
                <div class="float-md-left mb-4"><h2 class="text-black h5">Shop All</h2></div>
                <div class="d-flex">
                  <div class="mr-1 ml-md-auto btn-group">
                    <button type="button" class="btn btn-secondary btn-sm dropdown-toggle" id="dropdownMenuReference" data-toggle="dropdown">Reference</button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuReference">
                      <a class="dropdown-item" href="#">Name, A to Z</a>
                      <a class="dropdown-item" href="#">Name, Z to A</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Price, low to high</a>
                      <a class="dropdown-item" href="#">Price, high to low</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row mb-5">

              <template v-for="product in products.data">
                <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                  <div class="block-4 text-center border">
                    <figure class="block-4-image">
                      <a :href="`/product/${product.id}`"><img v-bind:src="product.thumbnail.url" alt="Image placeholder" class="img-fluid"></a>
                    </figure>
                    <div class="block-4-text p-4">
                      <h3><a :href="`/product/${product.id}`">{{ product.name }}</a></h3>
                      <p class="mb-0">{{ product.category }}</p>
                      <p class="text-primary font-weight-bold">{{ product.price }}€</p>
                    </div>
                  </div>
                </div>
              </template>


            </div>
            <div class="row" data-aos="fade-up">
              <div class="col-md-12 text-center">
                <div class="site-block-27">
                  <ul>
                    <li><a href="#">&lt;</a></li>
                    <template v-for="index in products.lastPage">
                      <li :class="{ 'active': activeIndex === index }" @click="fetchPage(index)"><span>{{ index }}</span></li>
                    </template>
                    <li><a href="#">&gt;</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="col-md-3 order-1 mb-5 mb-md-0">
            <div class="border p-4 rounded mb-4">
              <h3 class="mb-3 h6 text-uppercase text-black d-block">Categories</h3>
              <ul class="list-unstyled mb-0">
                <template v-for="category in categories">
                  <li @click="fetchProductsByCategory(category)" class="mb-1 d-flex"><span>{{ category.name }}</span> <span class="text-black ml-auto">{{ category.total }}</span></li>
                </template>
              </ul>
            </div>

            <div class="border p-4 rounded mb-4">
              <div class="mb-4">
                <h3 class="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
                <!-- <vue-slider ref="slider" v-model="value"></vue-slider> -->
              </div>
            </div>
          </div>
        </div>
        <!-- <app-collections></app-collections> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import Collections from '@/components/elements/Collections.vue';

export default {
  mounted() {
    this.fetchProducts()
    this.fetchCategoriesCount()
  },
  components: {
    appCollections: Collections
  },
  computed: {
    ...mapState('products', [
      'products',
      'activeIndex',
      'categories'
    ])
  },
  methods: {
    ...mapActions('products', [
      'fetchProducts',
      'fetchPage',
      'fetchCategoriesCount',
      'fetchProductsByCategory'
    ])
  }
}
</script>

<style scoped>
  span {
    color: #7971ea;
  }
</style>
