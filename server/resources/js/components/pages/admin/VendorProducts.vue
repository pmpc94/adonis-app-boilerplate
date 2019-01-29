<template>
  <v-app id="inspire">
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
      @click=""
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
  <v-list-tile v-else @click="" :key="item.text">
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
  <span class="hidden-sm-and-down">Back Office</span>
</v-toolbar-title>
<v-spacer></v-spacer>
</v-toolbar>
<v-content>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-tooltip right>
        <v-btn
        icon
        large
        :href="source"
        target="_blank"
        slot="activator"
        >
        <v-icon large>code</v-icon>
      </v-btn>
      <span>Source</span>
    </v-tooltip>
  </v-layout>
</v-container>
</v-content>
</v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { icon: 'list', text: 'Products' },
      { icon: 'history', text: 'Orders' },
      { icon: 'settings','icon-alt': 'keyboard_arrow_down', text: 'Settings',
      children: [
        { text: 'Reset Password' },
        { text: 'Update Password' }
      ]
    }
  ],
  }),
  props: {
    source: String
  }
}
</script>

<style lang="css">
</style>
