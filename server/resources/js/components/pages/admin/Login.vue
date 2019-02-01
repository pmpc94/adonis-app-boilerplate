<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="purple">
                <v-toolbar-title>Admin</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field :value="loginEmail" @input="setLoginEmail" color="purple" prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field :value="loginPassword" @input="setLoginPassword" color="purple" prepend-icon="lock" name="password" label="Password" id="password" type="password"></v-text-field>
                  <v-alert type="error" :value="loginError"> {{loginError}} </v-alert>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <div class="text-xs-center">
                  <v-dialog
                  v-model="dialog"
                  width="500"
                  >
                  <v-btn
                  slot="activator"
                  color="purple"
                  dark
                  >
                  Reset Password
                </v-btn>

                <v-card>
                  <v-card-title style="color: white"
                  class="headline purple"
                  primary-title
                  >
                  Password Reset
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-card-text>
                      Please insert your email below in order to reset your password.
                    </v-card-text>

                    <v-text-field v-model="email" outline color="purple"> </v-text-field>
                  </v-form>
                </v-card-text>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn
                  color="purple"
                  dark
                  @click="dialog = false"
                  >
                  CLOSE
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                color="purple"
                dark
                @click="sendEmail(), dialog = false"
                >
                SEND EMAIL
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <v-spacer></v-spacer>
      <v-btn @click="login" dark color="purple">Login</v-btn>
    </v-card-actions>

  </v-card>
</v-flex>
</v-layout>
</v-container>
</v-content>
</v-app>
</template>

<script>
import HTTP from '@/http/admin';
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
const hash = require('string-hash');

export default {
  name: 'Login',
  data() {
    return {
      dialog: false,
      email: ''
    }
  },
  computed: {
    ...mapState('authentication', [
      'loginEmail',
      'loginPassword',
      'loginError'
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn'
    ])
  },
  methods: {
    ...mapMutations('authentication', [
      'setLoginEmail',
      'setLoginPassword'
    ]),
    ...mapActions('authentication', [
      'login'
    ]),
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
