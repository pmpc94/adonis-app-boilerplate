<template>
  <div>
    <v-form>
      <h2>Title: </h2><v-text-field outline :value="name" @input="$emit('onInputName', $event)" placeholder="ex: Special Planet" class="headline mb-0"></v-text-field>
      <h2>Category: </h2>
      <v-select :items="categories" :value="category" @input="$emit('onInputCategory', $event)" placeholder="ex: terrestrial" outline></v-select>
      <h2>Description: </h2>
      <v-textarea outline name="input-7-1" placeholder="ex: The people who purchase this planet have the power to live forever." :value="description" @input="$emit('onInputDescription', $event)" hint=""></v-textarea>
      <h2>Price: </h2>
      <div class="v-input headline mb-0 v-text-field v-text-field--enclosed v-text-field--outline v-text-field--placeholder theme--light">
        <div class="v-input__control">
          <div class="v-input__slot">
            <input :value="price" type="number" min="1" placeholder="ex: 33" @input="$emit('onInputPrice', $event)"></input>
          </div>
        </div>
      </div>
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
