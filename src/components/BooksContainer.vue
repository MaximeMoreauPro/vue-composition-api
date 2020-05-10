<template>
  <div class="books-container">
    <!-- Book Items -->
    <BookItem
      v-for="book in books"
      :book="book"
      :key="book.isbn13"
      :display-mode="displayMode"
      @pick-items="nbItems =>  $emit('pick-items', book, nbItems)"
    />
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import BookItem from './BookItem.vue'
import PickedBook from '../models/PickableBook'
import displayMode from './displayMode.mixin'

export default Vue.extend({
  name: 'BookContainer',

  mixins: [displayMode],

  components: { BookItem },

  props: {
    books: {
      type: Array as () => Array<PickedBook>,
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
}

</style>
