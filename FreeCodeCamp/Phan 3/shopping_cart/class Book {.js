class Book {
  constructor({ name, pageNumber, price, author }) {
    this.name = name || "";
    this.pageNumber = pageNumber || 0;
    this.price = price || 0;
    this.author = author || "";
  }
  getInfoBook() {
    return {
      name: this.name,
      pageNumber: this.pageNumber,
      price: this.price,
      author: this.author,
    };
  }
}
class Balo {
  constructor() {
    this.book = [];

    this.noteBook = 0;
    this.pen = 0;
    this.mask = 6;
  }
  addBook(input) {
    this.book = this.book.concat(input)

    this.book = [...this.book,...input]

    
  }
  hasExist(name) {
    const isBook = this.book.find((books) => books.name === name);
    return isBook !== undefined ;
  }
}
const baloA = new Balo();

const BookA = new Book({
  name: "Ngo Van quoc",
  pageNumber: 309,
  price: 500,
  author: "Vuong Nguyen",
});
const BookB = new Book({
  name: "Dac nhan tam",
  price: 28,
  author: "Ngo van quoc",
  pageNumber: 300,
});
const BookC = new Book({
  name: "Dac nhan tam",
  price: 28,
  author: "Ngo van quoc",
  pageNumber: 300,
});


const inputNew = [BookA.getInfoBook(),BookB.getInfoBook(),BookC.getInfoBook()];
baloA.addBook(inputNew);

const baloB = new Balo();

