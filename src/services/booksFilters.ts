import Book from '@/models/Book'

// Filters Books by key words
export const keywordsFilter = (books: Book[], keywordsQuery: string, matchAll: boolean): Book[] => {
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
export const priceFilter = (books: Book[], minPrice: number, maxPrice: number): Book[] =>
  books.filter(({ price }) => price >= minPrice && price <= maxPrice)

// Filters Books by release year (between or equals min and max)
export const yearFilter = (books: Book[], minYear: number, maxYear: number): Book[] =>
  books.filter(({ year }) => year >= minYear && year <= maxYear)

// Filters Books by ratings (equals or superior to minRating)
export const ratingFilter = (books: Book[], minRating: number): Book[] =>
  books.filter(({ rating }) => rating >= minRating)

// Filters Books by number of pages (between or equals min and max)
export const pagesFilter = (books: Book[], minPages: number, maxPages: number): Book[] =>
  books.filter(({ pages }) => pages >= minPages && pages <= maxPages)

// Filters Books by available status
export const availableFilter = (books: Book[]): Book[] =>
  books.filter(({ quantity }) => quantity > 0)
