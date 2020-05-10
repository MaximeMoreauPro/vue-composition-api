<template>
  <el-container class="cart">

    <el-header class="header" :style="{ height: 'none' }">
      <span class="cart-title">Cart with <span class="green">{{ pickedBooksCount + ' book' + (pickedBooksCount > 1 ? 's' : '')  }}</span> (total amount: {{ totalAmount | currency }})</span>
      <el-button class="bookstore-button" @click="goToBookstore" type="success" icon="el-icon-collection">Go to Bookstore</el-button>
    </el-header>

    <el-container class="picked-books" direction="vertical">

      <h1 v-if="pickedBooks.length === 0">No Books Picked!</h1>
      <h1 v-else>{{ pickedBooks.length + ' Books' + (pickedBooks.length > 1 ? 's' : '') + ' in your Cart' }}</h1>

      <!-- <el-row>
        <el-select class="sorting" v-model="selectedSorting" placeholder="Sort by">
          <el-option
            v-for="sorting in availableSortings"
            :key="sorting.value"
            :label="sorting.label"
            :value="sorting.value">
          </el-option>
        </el-select>
      </el-row> -->

      <el-row>
        <el-col>
          <BooksContainer :books="pickedBooks" display-mode="cart-mode"  @pick-items="onPickItems"/>
        </el-col>
      </el-row>
    </el-container>

  </el-container>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api'
import BooksContainer from '@/components/BooksContainer.vue'
import PickedBook from '@/models/PickableBook'
import useCart from '../features/useCart'

interface Data {
  pickedBooks: Array<PickedBook>;
}
export default defineComponent({
  name: 'Cart',

  components: { BooksContainer },

  setup (props, context) {
    function goToBookstore () {
      context.root.$router.push({ path: '/' })
    }
    return {
      goToBookstore,
      ...useCart()
    }
  }
})
</script>

<style lang="scss" scoped>

.header {
  position: fixed;
  top: 0;
  width: 100%;
  height: 80px;
  padding: 20px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 2;

  .cart-title {
    font-size: 25px;
    font-weight: bold;
    color: #2c3e50;

    .green {
      color: #3eaf7c;
    }
  }
  .bookstore-button {
    width: 162px;
    float: right;
  }
}

.picked-books {
  margin: 20px;

  .sorting {
    float: right;
  }
}

</style>
