<template>
  <div class="books-container">
    <!-- Book Items -->
    <BookItem v-for="book in books" :book="book" :key="book.isbn13" @cart-action="$emit('cart-action', book)"/>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import BookItem from './BookItem.vue'
import PickableBook from '../models/PickableBook'

export default Vue.extend({
  name: 'BookContainer',

  components: { BookItem },

  props: {
    books: {
      type: Array as () => Array<PickableBook>,
      required: true
    }
  }
})

</script>

<style lang="scss" scoped>

.books-container {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;

  /deep/ .book-item {
    margin: 30px;
    // flex: 0 1 calc(25%);
  }
}

</style>
