import Book from './Book'

// Picked Book
export default interface PickedBook extends Book {
  quantityPicked: number;
}
