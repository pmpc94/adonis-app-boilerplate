<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-card-title style="color: white"
              class="headline purple"
              primary-title
              >
              PC Shop - Password Reset
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field name="password_one" label="insert password" color="purple" type="password" prepend-icon="lock" v-model="password_one"> </v-text-field>
                <v-text-field name="password_two" label="confirm password" color="purple" type="password" prepend-icon="lock" v-model="password_two"> </v-text-field>
                <v-btn dark @click="updatePassword()" color="success">Update Password</v-btn>
                <v-alert :type="alertType" :value="message"> {{ message }} </v-alert>
              </v-form>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
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
