<template>
  <div>
    <div v-if="this.$root.showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">

            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Thanks for choosing us!</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true" @click="$root.showModal = false">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>Your product was added to the cart.</p>
                </div>
                <div class="modal-footer">
                  <router-link @click.native="$root.showModal = false" class="btn btn-secondary" tag="li" to="/">Continue Shopping</router-link>
                  <router-link @click.native="$root.showModal = false" class="buy-now btn btn-sm btn-primary" tag="li" to="/cart">See Cart</router-link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
