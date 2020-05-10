import Book from '@/models/Book'

// Filters Books by key words
export const keywordsFilter = (books: Array<Book>, keywordsQuery: string, matchAll: boolean): Array<Book> => {
  if (keywordsQuery) {
    const keywords: Array<string> = keywordsQuery.toLowerCase().replace(/\s+/g, ' ').split(' ')

    return books.filter(({ isbn13, title, authors, subtitle, publisher, desc }) => {
      const searchableProps = isbn13.concat(title, authors, subtitle, publisher, desc).toLowerCase()

      return matchAll ? keywords.every(keyword => searchableProps.includes(keyword)) : keywords.some(keyword => searchableProps.includes(keyword))
    })
  } else {
    return books
  }
}

// Filters Books by price (between or equals min and max)
export const priceFilter = (books: Array<Book>, minPrice: number, maxPrice: number): Array<Book> =>
  books.filter(({ price }) => price >= minPrice && price <= maxPrice)

// Filters Books by release year (between or equals min and max)
export const yearFilter = (books: Array<Book>, minYear: number, maxYear: number): Array<Book> =>
  books.filter(({ year }) => year >= minYear && year <= maxYear)

// Filters Books by ratings (equals or superior to minRating)
export const ratingFilter = (books: Array<Book>, minRating: number): Array<Book> =>
  books.filter(({ rating }) => rating >= minRating)

// Filters Books by number of pages (between or equals min and max)
export const pagesFilter = (books: Array<Book>, minPages: number, maxPages: number): Array<Book> =>
  books.filter(({ pages }) => pages >= minPages && pages <= maxPages)

// Filters Books by available status
export const availableFilter = (books: Array<Book>) =>
  books.filter(({ quantity }) => quantity > 0)
