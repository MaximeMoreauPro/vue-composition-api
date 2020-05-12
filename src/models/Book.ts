// Describes the Book props
export default interface Book {
  // ISBN-13 is the Book ID
  isbn13: string;
  title: string;
  // PNG cover picture url (data sample contains a wide white margin :/ )
  cover: string;
  // Book auhtors split by ', '
  authors: string;
  price: number;
  // Rating on 5 (int)
  rating: number;
  quantity: number;
  pickedQuantity: number;
  subtitle: string;
  publisher: string;
  pages: number;
  year: number;
  desc: string;
}
