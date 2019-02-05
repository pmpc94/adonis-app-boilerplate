<template>
  <div>
    <v-form>
      <h2>Title*</h2><v-text-field outline name="title" v-validate="'required'" :value="name" @input="$emit('onInputName', $event)" placeholder="ex: Special Planet" class="headline mb-0"></v-text-field>
      <span>{{ errors.first('title') }}</span>
      <h2>Category*</h2>
      <v-select outline name="category" v-validate:category="'required'" :items="categories" :value="category" @input="$emit('onInputCategory', $event)" placeholder="ex: terrestrial"></v-select>
      <span>{{ errors.first('category') }}</span>
      <h2>Description*</h2>
      <v-textarea outline name="description" v-validate="'required'" :value="description" @input="$emit('onInputDescription', $event)" placeholder="ex: The people who purchase this planet have the power to live forever." hint=""></v-textarea>
      <span>{{ errors.first('description') }}</span>
      <h2>Price*</h2>
      <v-text-field outline name="price" v-validate="'min_value:0|required'" type="number" min="0" :value="price" @input="$emit('onInputPrice', $event)" @keydown="$emit('preventUndesiredChars', $event)" placeholder="ex: 33" class="headline mb-0"></v-text-field>
      <span>{{ errors.first('price') }}</span>
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
    price: [Number, String]
  },
  methods: {
    async validateAll() {
      return await this.$validator.validateAll();
    }
  }
}
</script>

<style scoped>
span {
  color: red;
}
</style>
