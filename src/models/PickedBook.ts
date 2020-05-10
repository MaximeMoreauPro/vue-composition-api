
import PickableBook from './PickableBook'

// Picked Book
export default interface PickedBook extends PickableBook {
  pickedQuantity: number;
}
