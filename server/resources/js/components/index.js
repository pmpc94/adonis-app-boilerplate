// import * as elements from './elements'
import vueSlider from 'vue-slider-component'

// const components = {
//   ...elements
// }
// Polygon Innovation Design
export default {
  install(Vue, options) {
    Vue.component('VueSlider', vueSlider)
    // for (let key in components) {
    //   let c = components[key]
    //   Vue.component(c.name, c)
    // }
  }
}
