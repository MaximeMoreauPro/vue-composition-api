import Book from '@/models/Book'

// Sorts Books by decreasing rating
export const sortByRating = (books: Array<Book>): void => {
  books.sort((a, b) => b.rating - a.rating)
}

// Sorts Books by decreasing price
export const sortByPrice = (books: Array<Book>): void => {
  books.sort((a, b) => b.price - a.price)
}

// Sorts Books by decreasing release year
export const sortByYear = (books: Array<Book>): void => {
  books.sort((a, b) => b.year - a.year)
}
