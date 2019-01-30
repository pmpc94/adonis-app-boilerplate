<template>
  <div>
    <h2>Password Reset</h2>
    <p>You'll receive an email with the necessary steps.</p>
    <v-btn @click="sendEmail" color="success">Reset my Password</v-btn>
  </div>
</template>

<script>
import HTTP from '@/http/admin';
import { mapGetters } from 'vuex';

export default {
  name: 'Settings',
  computed: {
    ...mapGetters('authentication', [
      'email'
    ])
  },
  methods: {
    async sendEmail() {
      await HTTP().post(`resetPassword`, {
        email: this.email
      })
    }
  }
}
</script>

<style lang="css">
</style>
