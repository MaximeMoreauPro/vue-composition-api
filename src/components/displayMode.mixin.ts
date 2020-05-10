export default {
  props: {
    displayMode: {
      type: String,
      validator: (val: string) => ['books-store-mode', 'cart-mode'].includes(val),
      default: 'books-store-mode'
    }
  }
}
