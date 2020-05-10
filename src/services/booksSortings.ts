import Book from '@/models/Book'

// Sorts Books by decreasing rating
export const sortByRating = (books: Array<Book>): void => {
  books.sort((a, b) => b.rating - a.rating)
}

// Sorts Books by increasing price
export const sortByPrice = (books: Array<Book>): void => {
  books.sort((a, b) => a.price - b.price)
}

// Sorts Books by decreasing release year
export const sortByYear = (books: Array<Book>): void => {
  books.sort((a, b) => b.year - a.year)
}
