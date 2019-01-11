import findIndex from 'lodash/findIndex'
export default {
  methods: {
    addToCart(id, quantity) {
      let cart = JSON.parse(this.$cookie.get('cart'))
      let index = findIndex(cart.products, { id })
      if (index !== -1) {
        cart.products[0].quantity += quantity
      } else {
        cart.products.push({
          id,
          quantity
        })
      }
      this.$cookie.set('cart', JSON.stringify(cart))
      this.$root.recount()
      this.$root.showModal = true
    }
  }
}
