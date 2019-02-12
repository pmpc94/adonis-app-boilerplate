<template>
  <div class="text-xs-center">
    <v-dialog
      :value="dialog"
      width="500"
      @input="$emit('onInputChange', $event)"
    >
      <v-card>
        <v-card-title style="color: white"
          class="headline purple"
          primary-title
        >
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ message }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="purple"
            dark
            @click="$emit('hide')"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
      title: String,
      message: String,
      dialog: Boolean
    }
  }
</script>

<style lang="css">
</style>
