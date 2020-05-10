import PickedBook from '@/models/PickedBook'

// Compute the total cost of the picked books (in user cart)
export const totalCost = (books: Array<PickedBook>): number => books.reduce((acc, book) => acc + book.quantityPicked * book.price, 0)
