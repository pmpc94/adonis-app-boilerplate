<template>
  <v-app>
    <v-card>
      <v-card-title primary-title>
        <h1>Planet & Comet Shop - Password Reset</h1>
      </v-card-title>
    </v-card>
  <v-card>
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs6>
          <h2>Insert your new Password</h2>
          <v-text-field type="password" v-model="password_one" outline> </v-text-field>

          <h2>Please confirm your new Password</h2>
          <v-text-field type="password" v-model="password_two" outline> </v-text-field>
          <v-btn dark @click="updatePassword()" color="success">Update Password</v-btn>
          <v-alert :type="alertType" :value="message"> {{ message }} </v-alert>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</v-app>
</template>

<script>
import HTTP from '@/http/admin';

export default {
  name: 'PasswordReset',
  data() {
    return {
      token: '',
      email: '',
      password_one: '',
      password_two: '',
      message: '',
      alertType: undefined
    }
  },
  mounted() {
    this.email = this.$route.params.email;
    this.token = this.$route.params.token;
  },
  methods: {
    async updatePassword() {
      if (this.equalPasswords()) {
        return HTTP().post('updatePassword', {
          email: this.email,
          password: this.password_one,
          token: this.token
        })
        .then(response => {
          this.alertType = 'success';
          this.message = 'Your password was successfully updated.';
          this.$router.push('/login');
        })
        .catch(error => {
          this.alertType = 'error';
          this.message = 'Server error. Make sure you inserted a valid password.';
        });
      }
      this.alertType = 'error';
      this.message = 'The passwords do not match!';
    },
    equalPasswords() {
      return this.password_one === this.password_two ? true : false;
    }
  }
}
</script>

<style lang="css">
</style>
