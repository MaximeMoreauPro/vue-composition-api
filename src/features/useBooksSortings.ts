import { reactive, toRefs, computed, Ref } from '@vue/composition-api'
import Book from '@/models/Book'
import { sortByRating, sortByPrice, sortByYear } from '@/services/booksSortings'

// Provides books sortings feature
const useBooksSortings = function (books: Readonly<Ref<readonly Book[]>>) {
  const data = reactive({
    selectedSorting: 'rating', // default sorting
    availableSortings: [
      { value: 'rating', label: 'Rating' },
      { value: 'price', label: 'Price' },
      { value: 'year', label: 'Release Year' }
    ]
  })

  const sortedBooks = computed(() => {
    const booksToSorted = [...books.value]
    switch (data.selectedSorting) {
      case 'price':
        sortByPrice(booksToSorted)
        break

      case 'year':
        sortByYear(booksToSorted)
        break

      case 'rating':
      default:
        sortByRating(booksToSorted)
        break
    }

    return booksToSorted
  })

  return {
    sortedBooks,
    ...toRefs(data)
  }
}

export default useBooksSortings
