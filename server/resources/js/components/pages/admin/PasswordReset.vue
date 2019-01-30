<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs6>
        <h2>Insert your new Password</h2>
        <v-text-field v-model="password_one" outline> </v-text-field>

        <h2>Please confirm your new Password</h2>
        <v-text-field v-model="password_two" outline> </v-text-field>
        <v-btn @click="updatePassword()" color="info">Update Password</v-btn>
        <v-alert :type="alertType" :value="message"> {{ message }} </v-alert>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HTTP from '@/http/admin';
const hash = require('string-hash');

export default {
  name: 'PasswordReset',
  data() {
    return {
      token: '',
      email: '',
      password_one: '',
      password_two: '',
      message: '',
      alertType: ''
    }
  },
  mounted() {
    this.email = this.$route.params.email;
    this.token = this.$route.params.token;
  },
  methods: {
    async updatePassword() {
      if (this.equalPasswords() && this.validPasswordLength() && this.validHashedEmail()) {
        return HTTP().post('updatePassword', {
          email: this.email,
          password: this.password_one
        })
        .then(response => {
          this.alertType = 'success';
          this.message = 'Your password was successfully updated.';
        })
        .catch(error => {
          this.alertType = 'error';
          this.message = 'Server error. Please try again later.';
        });
      }
      this.alertType = 'error';
      this.message = 'The passwords do not match or they do not have a minimum of 6 characters!';
    },
    equalPasswords() {
      return this.password_one === this.password_two ? true : false;
    },
    validPasswordLength() {
      return this.password_one.length > 6 ? true : false;
    },
    validHashedEmail() {
      return hash(this.email) === parseInt(this.token) ? true : false;
    }
  }
}
</script>

<style lang="css">
</style>
