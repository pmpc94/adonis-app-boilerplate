<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="purple">
                <v-toolbar-title>Back Office</v-toolbar-title>
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
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'Login',
  computed: {
    ...mapState('authentication', [
      'loginEmail',
      'loginPassword',
      'loginError'
    ])
  },
  methods: {
  ...mapMutations('authentication', [
    'setLoginEmail',
    'setLoginPassword'
  ]),
  ...mapActions('authentication', [
    'login'
  ])
  }
}
</script>

<style lang="css">
</style>
