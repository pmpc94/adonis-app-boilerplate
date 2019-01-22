<template>
  <div>
    <div class="site-section">
      <div class="container">

        <div class="row mb-5">
          <div class="col-md-9 order-2">

            <div class="row">
              <div class="col-md-12 mb-5">
                <div class="float-md-left mb-4"><h2 class="text-black h5"><a @click="resetVariables" style="color: #7971ea;">Shop All</a><span v-if="currentCategory"> / {{ currentCategory.name }} </span><span v-if="column && order"> - ({{ orderText }})</span></h2></div>
                <div class="d-flex">
                  <div class="mr-1 ml-md-auto btn-group" :class="{ 'show': showFlag }">
                    <button @click="toggleDropdown" :aria-expanded="showFlag" type="button" class="btn btn-secondary btn-sm dropdown-toggle"  id="dropdownMenuReference" data-toggle="dropdown">Reference</button>
                    <div class="dropdown-menu" :class="{ 'show': showFlag }" aria-labelledby="dropdownMenuReference">
                      <a class="dropdown-item" @click="fetchProducts({ column: 'name', order: 'ASC' }), showFlag = !showFlag, orderText = 'Name, A to Z'">Name, A to Z</a>
                      <a class="dropdown-item" @click="fetchProducts({ column: 'name', order: 'DESC' }), showFlag = !showFlag, orderText = 'Name, Z to A'">Name, Z to A</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" @click="fetchProducts({ column: 'price', order: 'ASC' }), showFlag = !showFlag, orderText = 'Price, low to high'">Price, low to high</a>
                      <a class="dropdown-item" @click="fetchProducts({ column: 'price', order: 'DESC' }), showFlag = !showFlag, orderText = 'Price, high to low'">Price, high to low</a>
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
                    <template v-for="id in products.lastPage">
                      <li :class="{ 'active': activePage === id }" @click="fetchProducts({ activePage: id }), activePage = id"><span>{{ id }}</span></li>
                    </template>
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
                  <li style="cursor: pointer; color: #7971ea;" @click="fetchPriceRange({ category }), currentCategory = category" class="mb-1 d-flex"><span>{{ category.name }}</span> <span class="text-black ml-auto">{{ category.total }}</span></li>
                </template>
              </ul>
            </div>

            <div class="border p-4 rounded mb-4">
              <div class="mb-2">
                <h3 class="mb-5 h6 text-uppercase text-black d-block">Filter by Price (€)</h3>
                <vue-slider ref="slider" v-model="priceRange" :min="0" :max="max"></vue-slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP from '@/http';

export default {
  data () {
    return {
      showFlag: false,
      activePage: 1,
      max: 100,
      priceRangeMin: 0,
      priceRangeMax: 100,
      priceRange: [],
      currentCategory: undefined,
      products: [],
      column: undefined,
      order: undefined,
      categories: [],
      orderText: ''
    }
  },
  mounted() {
    this.fetchCategoriesCount()
    this.fetchPriceRange({ activePage: 1})
  },

  methods: {
    async fetchProducts({ category, column, order, activePage, range } = {}) {
      console.log("fetchProducts")
      let query = '';
      this.activePage = activePage !== undefined ? activePage : 1;
      if (category !== undefined) {
        query += `&category=${category.name}`;
        this.activePage = 1;
        this.currentCategory = category;
      }
      if (category === undefined && this.currentCategory !== undefined){
        query += `&category=${this.currentCategory.name}`;
      }
      if (column !== undefined && order !== undefined){
        query += `&${column}=${order}`;
        this.column = column;
        this.order = order;
      }
      if (column === undefined && order === undefined && this.column !== undefined && this.order !== undefined) {
        query += `&${this.column}=${this.order}`;
      }
      if (range !== undefined) {
          query += `&min=${range[0]}&max=${range[1]}`;
          this.priceRangeMin = range[0];
          this.priceRangeMax = range[1];
      }
      if (range === undefined && this.priceRangeMin !== undefined && this.priceRangeMax !== undefined) {
          query += `&min=${this.priceRangeMin}&max=${this.priceRangeMax}`
      }
      const { data } = await HTTP().get(`/products?page=${this.activePage}${query}`)
      this.products = data.data;
    },
    async fetchCategoriesCount() {
      const { data } = await HTTP().get('/categoriesCount');
      this.categories = data.data;
    },
    async fetchPriceRange({ activePage, category } = {}) {
      console.log("fetchPriceRange")
      let query = '';
      if (category!== undefined) {
        query += `?category=${category.name}`
      }
      const { data } = await HTTP().get(`/priceRange${query}`);
      this.max = data.data.max_price;
      this.priceRange = [0, this.max];
    },
    resetVariables() {
      this.currentCategory = undefined;
      this.column = undefined;
      this.order = undefined;
      this.fetchPriceRange();
    },
    toggleDropdown() {
      this.showFlag = !this.showFlag;
    }
  },
  watch: {
    priceRange(val) {
      console.log("watch")
      val[0] !== undefined ? this.fetchProducts({ range: val}) : '';
    }
  }
}
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
