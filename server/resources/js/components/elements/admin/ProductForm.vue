<template>
  <div>
    <v-form>
      <h2>Title: </h2><v-text-field outline :value="name" @input="$emit('onInputName', $event)" class="headline mb-0"></v-text-field>
      <h2>Category: </h2>
      <v-select :items="categories" :value="category" @input="$emit('onInputCategory', $event)" label="ex: terrestrial" outline></v-select>
      <h2>Description: </h2>
      <v-textarea outline name="input-7-1" label="Modify your product description below:" :value="description" @input="$emit('onInputDescription', $event)" hint=""></v-textarea>
      <h2>Price: </h2><v-text-field outline :value="price" @input="$emit('onInputPrice', $event)"></v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  props: {
    categories: Array,
    category: String,
    name: String,
    description: String,
    price: Number
  }
}
</script>

<style lang="css">
</style>
