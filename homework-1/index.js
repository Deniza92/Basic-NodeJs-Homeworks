import { createPath } from "./path.js";
import { dataServise } from "./src/dataServise.service.js";
import { Book } from "./src/book.model.js";
import { loggerEmmiter } from "./src/logger.js";

const BOOKS_PATH = createPath(["data", "data.json"]);

//1. Get all books 

const getAllBooks = async () => {
    const books = await dataServise.readJSONFile(BOOKS_PATH);

    return books;

};

//2. Save books

 const saveAllBooks = async (books) => {
    await dataServise.saveJSONFile(BOOKS_PATH, books);
 };

 //3. Create book

 const createBook = async (title, author, publicationYear, quantity) => {

    const books = await getAllBooks();

    const newBook = new Book(title, author, publicationYear, quantity);

    const updateBooks = [...books, newBook];

    await saveAllBooks(updateBooks);

    loggerEmmiter.emit("createBook", newBook.id);
 };

 //4. Get book by id

 const getBookbyId = async bookId => {

    const books = await getAllBooks();

    const foundBook = books.find(book => book.id === bookId);

    if (!foundBook) throw new Error("BOOK NOT FOUND!");
    return foundBook;
 }

 //5. Update book

 const updateBook = async (bookId, newTitle, newAuthor, newPublicationYear, newQuantity) => {
    
    const books = await getAllBooks();

    const idExists = books.some(book => book.id === bookId);

    if (!idExists) throw new Error ("Can't update book! Book not found!");

    const updatedBooks = books.map(book => {
        if (book.id === bookId) {
            return { ...book, tittle: newTitle, author: newAuthor, publicationYear: newPublicationYear, quantity: newQuantity };
        } else {
            return book;
        }
    });

    await saveAllBooks(updatedBooks);

    loggerEmmiter.emit("edit-book", bookId);

 };

 //6. Delete book 

 const deleteBook = async bookId => {
    const books = await getAllBooks;

    const updatedBooks = books.filter(book => book.id !== bookId);

    if (books.length === updatedBooks.length)

      throw new Error("Can't delete book! Book not found!");

      await saveBooks(updatedBooks);

      loggerEmmiter.emit("delete-book", bookId);


 };

 //7. Delete all books 

 const deleteAllBooks = async () => {
    await saveBooks([]);
 };

 const app = async () => {
    try {
        await createBook(
            "Twlight(Meyer novel)",
            "Stephenie Meyer",
            "October 5, 2005",
            "498"
        );

 const books = await getAllBooks();
    console.log(books);
  } catch (error) {
    console.error(error);
  }
};

app();




        
   


 

