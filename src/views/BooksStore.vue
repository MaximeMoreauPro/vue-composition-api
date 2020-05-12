<template>
  <el-container class="books-store">

    <el-header class="header" :style="{ height: 'none' }">
      <span class="bookstore-title">The <span class="green">Vue</span> Bookstore</span>
      <el-badge :value="pickedBooksCount" class="cart-badge" type="primary">
        <el-button @click="goToMyCart" type="success" icon="el-icon-shopping-cart-2">My Cart</el-button>
      </el-badge>
    </el-header>

    <el-main class="main">
      <el-container>
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

          <div>
            <span class="title" v-if="sortedBooks.length === 0">No Result</span>
            <span class="title" v-else>{{ sortedBooks.length + ' result' + (sortedBooks.length > 1 ? 's' : '') }}</span>
            <el-select class="sorting" v-model="selectedSorting" placeholder="Sort by">
              <el-option
                v-for="sorting in availableSortings"
                :key="sorting.value"
                :label="sorting.label"
                :value="sorting.value">
              </el-option>
            </el-select>
          </div>

          <el-row>
            <el-col>
              <BooksContainer :books="sortedBooks" @pick-items="onPickItems"/>
            </el-col>
          </el-row>
        </el-container>
      </el-container>
    </el-main>

  </el-container>
</template>

<script lang="ts">

import { defineComponent, reactive, toRefs } from '@vue/composition-api'
import BooksContainer from '@/components/BooksContainer.vue'
import useBooksFilters from '@/features/useBooksFilters'
import useBooksSortings from '@/features/useBooksSortings'
import useCart from '@/features/useCart'
import Book from '../models/Book'

interface Data {
  books: Book[];
}
export default defineComponent({
  name: 'BooksStore',

  components: { BooksContainer },

  setup (props, context) {
    const data = reactive({ books: context.root.$store.state.allBooks })

    function goToMyCart () {
      context.root.$router.push({ path: '/my-cart' })
    }

    // used features
    const booksFilters = useBooksFilters(data.books)
    const booksSortings = useBooksSortings(booksFilters.filteredBooks)

    return {
      ...toRefs(data),
      goToMyCart,
      // Cart feature
      ...useCart(),
      // Books filter feature
      ...booksFilters,
      ...booksSortings
    }
  }
})
</script>

<style lang="scss" scoped>

.books-store {
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 80px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 2;

    .bookstore-title {
      font-size: 30px;
      font-weight: bold;
      color: #2c3e50;

      .green {
        color: #3eaf7c;
      }
    }
    .cart-badge {
      float: right;

      button {
        width: 152px;
      }
    }
  }

  .main {
    position: relative;
    top: 80px;

    .filters {
      height: fit-content;
      min-width: 270px;
      width: 20%;
      padding: 20px;
      background-color: white;
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
  }
}

</style>
