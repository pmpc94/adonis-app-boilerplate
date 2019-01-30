<template>
  <div>
    <transition v-if="isLoggedIn" name="fade" mode="out-in">
        <Menu></Menu>
    </transition>
          <Login v-if="!isLoggedIn"></Login>
          <!-- <router-view v-if="!isLoggedIn"></router-view> -->
  </div>
</template>

<script>
import Menu from '@/components/partials/admin/Menu.vue';
import Login from '@/components/pages/admin/Login.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Admin',
  components: {
    Menu,
    Login
  },
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  }
}
</script>

<style lang="css">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
