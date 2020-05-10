<template functional>
  <div class="book-item" :class="[props.displayMode]" :title="'\t' + props.book.title + ':\n' + props.book.subtitle">

    <!-- Cart actions button and icon are displayed only in Books Store mode -->
    <div class="header">
      <template v-if="props.book.quantity > 0" >
        <!-- Add to Cart / Remove from Cart button -->
        <el-button
          class="cart-action-button"
          :title="props.book.isPicked ? 'Remove this Book from the Cart' : 'Add this Book to the Cart'"
          :type="props.book.isPicked ? 'danger' : 'success'"
          :icon="props.book.isPicked ? 'el-icon-delete' : 'el-icon-shopping-cart-2'"
          :plain="!props.book.isPicked"
          :size="props.book.isPicked ? 'mini' : 'medium'"
          @click="listeners['pick-items'](props.book.isPicked ? 0 : 1)"
        >
          {{ props.book.isPicked ? 'Remove from Cart' : 'Add to Cart' }}
        </el-button>

        <i v-if="props.book.isPicked && props.displayMode !== 'cart-mode'" class="is-picked-icon el-icon-shopping-cart-2"></i>
      </template>
    </div>

    <!-- Cover -->
    <div class="cover-container">
      <el-image
        class="cover"
        :class="{ 'is-blured': props.book.quantity === 0 }"
        :src="props.book.cover"
        fit="fill"
      />
      <div v-if="props.book.quantity === 0" class="message">
        Unavailable
      </div>
    </div>

    <!-- Book infos  -->
    <div class="book-infos">

      <!-- Title -->
      <div
        class="title ellipsis"
        :title="props.book.title"
      >
        {{ props.book.title }}
      </div>

      <!-- Authors -->
      <div
        class="authors ellipsis"
        :title="props.book.authors"
      >
        <em>by</em> {{ props.book.authors }}
      </div>

      <!-- Rating -->
      <el-rate
        class="rate"
        :value="props.book.rating"
        disabled
      />

      <!-- Formatted price -->
      <div class="price">{{ props.book.price | currency }}</div>

      <el-input-number
        v-if="props.displayMode === 'cart-mode'"
        :value="props.book.pickedQuantity"
        :min="1"
        :max="props.book.quantity"
        :title="'only ' + props.book.quantity + ' item' + (props.book.quantity > 1 ? 's' : '') + ' left'"
        controls-position="right"
        @change="val => listeners['pick-items'](val)"
      />

    </div>

  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import PickedBook from '../models/PickedBook'
import displayMode from './displayMode.mixin'

export default Vue.extend({
  name: 'BookItem',

  mixins: [displayMode],

  props: {
    book: {
      type: Object as () => PickedBook,
      required: true
    }
  }
})

</script>

<style lang="scss" scoped>

// uses the SCSS variables form Element UI Theme Chalk
@import "~element-ui/packages/theme-chalk/src/common/var.scss";

.book-item {
  max-width: 250px;
  // border: 1px solid black;

  .header {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    .cart-action-button {
      display: none;
      opacity: 0;
      transition: opacity 1s;
    }

    .is-picked-icon {
      color: $--color-success;
      font-size: 22px;
    }
  }

  .cover-container {
    position: relative;

    .cover {
      width: 65%;
      transition: all 0.5s;
      box-shadow: 0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19) !important;

      &.is-blured {
        filter: blur(2px);
      }
    }

    .message {
      text-align: center;
      color: #FFFFFFFF;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 22px;
      transition: font-size 0.5s;
      background-color: #4c4c4c;
      opacity: 0.7;
      border-radius: 4px;
      padding: 4px;
    }
  }

  .book-infos {
    margin: 15px 5px;

    .authors {
      font-size: 14px;
    }

    .rate {
      /deep/ .el-rate__icon {
        font-size: 22px;
      }
    }
  }

  &:hover {
    .header {
      .cart-action-button {
        display: inline;
        opacity: 1;
      }

      .is-picked-icon {
        display: none;
      }
    }

    .cover {
      &.is-blured {
        filter: blur(0);
      }
    }
  }

  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

</style>
