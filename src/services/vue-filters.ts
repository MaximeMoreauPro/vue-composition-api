import Vue from 'vue'

/**
 * Formated a double price in euro
 * ex:  1.5 => 1.50 €
 */
const currency = (price: number): string => price.toFixed(2) + ' €'
Vue.filter('currency', currency)

export default { currency }
