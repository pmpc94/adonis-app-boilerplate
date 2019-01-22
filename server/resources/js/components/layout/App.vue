<template>
  <div>
    <app-header></app-header>
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from '@/components/partials/Header.vue';
import Footer from '@/components/partials/Footer.vue';

export default {
  components: {
    appHeader: Header,
    appFooter: Footer
  }
}
</script>

<style lang="css">
</style>
