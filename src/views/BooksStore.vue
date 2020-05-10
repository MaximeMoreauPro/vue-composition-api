<template>
  <el-container class="books-store">

    <el-aside class="filters" :style="{ width: 'none' }">

      <h1>Filters</h1>

      <el-form label-width="90px">
        <el-form-item label="Search">
          <el-input
            placeholder="Title, Author, Keywords..."
            v-model="keywordsQuery">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-form-item>

        <el-form-item label="Unavailable">
          <el-switch v-model="displayUnavailableBook" />
        </el-form-item>

        <el-form-item class="min-rating" label="Min Rating">
          <el-rate v-model="minRating" />
        </el-form-item>
      </el-form>

    </el-aside>

    <el-container class="books-result" direction="vertical">

      <h1 v-if="sortedBooks.length === 0">No Result</h1>
      <h1 v-else>{{ sortedBooks.length + ' result' + (sortedBooks.length > 1 ? 's' : '') }}</h1>

      <el-row>
        <el-select class="sorting" v-model="selectedSorting" placeholder="Sort by">
          <el-option
            v-for="sorting in availableSortings"
            :key="sorting.value"
            :label="sorting.label"
            :value="sorting.value">
          </el-option>
        </el-select>
      </el-row>

      <el-row>
        <el-col>
          <BooksContainer :books="sortedBooks" @cart-action="onCartAction"/>
        </el-col>
      </el-row>
    </el-container>

  </el-container>
</template>

<script lang="ts">

import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import BooksContainer from '@/components/BooksContainer.vue'
import PickableBook from '@/models/PickableBook'
// Stubbed books TODO: implements a books API client service
import stubbedBooks from '@/data/stubbed-books'
import useBooksFilters from '@/features/useBooksFilters'
import useBooksSortings from '@/features/useBooksSortings'

interface Data {
  books: Array<PickableBook>;
}
export default defineComponent({
  name: 'BooksStore',

  components: { BooksContainer },

  setup () {
    // Transform Books into PickableBooks (unpicked by default)
    const data = reactive({ books: stubbedBooks.map(b => ({ isPicked: false, ...b })) })

    function onCartAction (book: PickableBook) {
      // toggle isPicked
      book.isPicked = !book.isPicked
    }

    // used features
    const booksFilters = useBooksFilters(data.books)
    const booksSortings = useBooksSortings(booksFilters.filteredBooks)

    return {
      ...toRefs(data),
      onCartAction,
      // Books filter feature
      ...booksFilters,
      ...booksSortings
    }
  }
})
</script>

<style lang="scss" scoped>

.filters {
  min-width: 270px;
  width: 20%;
  padding: 20px;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .min-rating /deep/ .el-form-item__content {
    top: 12px;
  }

  /deep/ .el-form-item__content {
    text-align: left;
  }
}

.books-result {
  margin: 20px;

  .sorting {
    float: right;
  }
}

</style>
