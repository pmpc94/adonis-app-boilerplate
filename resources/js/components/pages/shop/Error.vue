<template>
  <div>
        <div class="site-section">
          <div class="container">
            <div class="row">
              <div class="col-md-12 text-center">
                <span class="icon-check_circle display-3 text-success"></span>
                <h2 class="display-3 text-black">Something went wrong!</h2>
                <p class="lead mb-5">Please make sure you entered the correct card details.</p>
                <router-link class="btn btn-sm btn-primary" tag="li" to="/">Back to shop</router-link>
              </div>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style lang="css">
</style>
