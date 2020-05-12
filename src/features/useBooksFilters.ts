import { reactive, toRefs, computed } from '@vue/composition-api'
import Book from '@/models/Book'
import { keywordsFilter, availableFilter, ratingFilter } from '@/services/booksFilters'

// Keyword filter logic
function useKeywordsFilter (books: Book[]) {
  const data = reactive({ keywordsQuery: '', matchAll: false })

  const keywordsMatchedBooks = computed(() => keywordsFilter(books, data.keywordsQuery, data.matchAll))

  return {
    keywordsMatchedBooks,
    ...toRefs(data)
  }
}

// Available filter logic
function useAvailableFilter (books: Book[]) {
  const data = reactive({ displayUnavailableBook: true })

  const availableBooks = computed(() => data.displayUnavailableBook ? books : availableFilter(books))

  return {
    availableBooks,
    ...toRefs(data)
  }
}

// Rating filter logic
function useRatingFilter (books: Book[]) {
  const data = reactive({ minRating: 0 })

  const minRatingBooks = computed(() => ratingFilter(books, data.minRating))

  return {
    minRatingBooks,
    ...toRefs(data)
  }
}

// Provides books filters feature
export default function (books: Book[]) {
  const { keywordsMatchedBooks, keywordsQuery, matchAll } = useKeywordsFilter(books)
  const { availableBooks, displayUnavailableBook } = useAvailableFilter(books)
  const { minRatingBooks, minRating } = useRatingFilter(books)

  // Books matching all filters
  const filteredBooks = computed(() =>
    books.filter(book =>
      keywordsMatchedBooks.value.includes(book) &&
      availableBooks.value.includes(book) &&
      minRatingBooks.value.includes(book)
    )
  )

  // filtered books array by filter kind do not need to be exposed
  return {
    filteredBooks,
    // keywords
    keywordsQuery,
    matchAll,
    // available
    displayUnavailableBook,
    // rating
    minRating
  }
}
