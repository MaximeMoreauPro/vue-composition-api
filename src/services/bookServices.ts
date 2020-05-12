import Book from '@/models/Book'

// Compute the total cost of the picked books (in user cart)
export const totalCost = (books: Readonly<Book[]>): number => books.reduce((acc, book) => acc + book.pickedQuantity * book.price, 0)
