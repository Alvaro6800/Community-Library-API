import bookRepository from "../repositores/bookRepositories.js";
import bcrypt from "bcrypt"

async function createBookService(newBook, userId){
   // const foundBook = await userRepository.findUserByEmailRepository(newUser.email);
   // if(foundUser)
   //     throw new Error("User already exists!");

    const createdBook = await bookRepository.createBookRepository(newBook, userId);

    if(!createdBook)
        throw new Error('Error creating Book');

    return createdBook;
}

async function findAllBooksService(){
    const books = await bookRepository.findAllBooksRepository();
    return books;
}

async function findBookByIdService(bookId){
    const book = await bookRepository.findBookByIdRepository(bookId);

    if(!book)
        throw new Error("Book not found");

    return book;
}
 
 async function updateBookService(updatedBook, bookId, userId){
     const book = await bookRepository.findBookByIdRepository(bookId);

     if(!book)
         throw new Error("Book not found");

     if(book.userId !== userId)
         throw new Error("Unauthorized");
 
     const response = await bookRepository.updateBookRepository(bookId, updatedBook)
 
     return response;
 }

async function deleteBookService(bookId, userId){
    const book = await bookRepository.findBookByIdRepository(bookId);
 
     if(!book)
         throw new Error("Book not found");

     if(book.userId !== userId)
         throw new Error("Unauthorized");
 
     const response = await bookRepository.deleteBookRepository(bookId)
 
     return response;
}

async function searchBooksService(search){
    if(!search)
        return await bookRepository.findAllBooksRepository();

    const books = await bookRepository.searchBookRepository(search);

    return books;
}

export default{
    createBookService
    , findAllBooksService
    , findBookByIdService
    , updateBookService
    , deleteBookService
    , searchBooksService
}