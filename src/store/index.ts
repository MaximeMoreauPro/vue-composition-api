import Vue from 'vue'
import Vuex from 'vuex'
import Book from '@/models/Book'
import PickedBook from '@/models/PickedBook'
// Stubbed books TODO: implements a books API client service
import stubbedBooks from '@/data/stubbed-books'

Vue.use(Vuex)

interface State {
  allBooks: Array<Book>;
  pickedBooks: Array<PickedBook>;
}

function getPickedBookFromStorage () {
  if (localStorage['vue-composition-api:pickedBooks']) {
    return JSON.parse(localStorage['vue-composition-api:pickedBooks'])
  } else {
    return []
  }
}

function setPickedBookInStorage (pickedBooks: Array<PickedBook>) {
  // TODO: persist only the isbn13 and pickedQuantity props value
  localStorage['vue-composition-api:pickedBooks'] = JSON.stringify(pickedBooks)
}

export default new Vuex.Store<State>({
  state: {
    allBooks: stubbedBooks,
    pickedBooks: getPickedBookFromStorage()
  },
  mutations: {
    pickBook (state, book: PickedBook) {
      if (!state.pickedBooks.includes(book)) {
        state.pickedBooks.push(book)
      }
    },
    removeBook (state, isbn13: string) {
      state.pickedBooks = state.pickedBooks.filter(b => b.isbn13 !== isbn13)
    }
  },
  actions: {
    pickBook (context, { book, nbItem }: { book: PickedBook; nbItem: number }) {
      book.pickedQuantity = nbItem
      book.isPicked = true
      context.commit('pickBook', book)
      setPickedBookInStorage(context.state.pickedBooks)
    },
    removeBook (context, book: PickedBook) {
      book.pickedQuantity = 0
      book.isPicked = false
      context.commit('removeBook', book.isbn13)
      setPickedBookInStorage(context.state.pickedBooks)
    }
  },
  getters: {
    pickedBooksCount: state => state.pickedBooks.length
  }
})
