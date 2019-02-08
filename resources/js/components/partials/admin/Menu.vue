<template>
  <v-app id="inspire" class="vuetify-menu">
    <v-navigation-drawer
    fixed
    :clipped="$vuetify.breakpoint.mdAndUp"
    app
    v-model="drawer"
    >
    <v-list dense>
      <template v-for="item in items">
        <v-layout
        row
        v-if="item.heading"
        align-center
        :key="item.heading"
        >
        <v-flex xs6>
          <v-subheader v-if="item.heading">
            {{ item.heading }}
          </v-subheader>
        </v-flex>
        <v-flex xs6 class="text-xs-center">
          <a href="#!" class="body-2 black--text">EDIT</a>
        </v-flex>
      </v-layout>
      <v-list-group
      v-else-if="item.children"
      v-model="item.model"
      :key="item.text"
      :prepend-icon="item.model ? item.icon : item['icon-alt']"
      append-icon=""
      >
      <v-list-tile slot="activator">
        <v-list-tile-content>
          <v-list-tile-title>
            {{ item.text }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile
      v-for="(child, i) in item.children"
      :key="i"
      :to="item.link"
      >
      <v-list-tile-action v-if="child.icon">
        <v-icon>{{ child.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ child.text }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list-group>
  <v-list-tile v-else :to="item.link" :key="item.text">
    <v-list-tile-action>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>
        {{ item.text }}
      </v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>
</v-list>
</v-navigation-drawer>
<v-toolbar
color="purple darken-3"
dark
app
:clipped-left="$vuetify.breakpoint.mdAndUp"
fixed
>
<v-toolbar-title style="width: 300px" class="ml-0 pl-3">
  <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
  <span class="hidden-sm-and-down">Planet & Comet Admin</span>
</v-toolbar-title>
<v-spacer></v-spacer>
<v-btn flat>
  <v-icon class="mr-2">account_circle</v-icon>{{ email }}
</v-btn>
<v-btn flat @click="logout()">
  <v-icon class="mr-2">exit_to_app</v-icon>Logout
</v-btn>
</v-toolbar>

<v-content>
  <v-container fluid>
    <v-layout>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
      </v-layout>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Menu',
  data: () => ({
    dialog: false,
    drawer: null,
    items: [
      { icon: 'add', text: 'Product', link: '/backoffice/product-section' },
      { icon: 'list', text: 'Products', link: '/backoffice/products' },
      { icon: 'history', text: 'Orders' , link: '/backoffice/orders'}
    ],
  }),
  computed: {
    ...mapGetters('authentication', [
      'email'
    ])
  },
  methods: {
    ...mapActions('authentication', [
      'logout'
    ])
  }
}
</script>

<style>

</style>
