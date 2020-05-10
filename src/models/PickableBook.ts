import Book from './Book'

// Pickable Book
export default interface PickableBook extends Book {
  isPicked: boolean;
}
