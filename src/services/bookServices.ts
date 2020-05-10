import PickedBook from '@/models/PickedBook'

// Compute the total cost of the picked books (in user cart)
export const totalCost = (books: Readonly<Array<PickedBook>>): number => books.reduce((acc, book) => acc + book.pickedQuantity * book.price, 0)
