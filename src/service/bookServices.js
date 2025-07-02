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

// async function findUsersByIdService(userId){
//     const user = await userRepository.findUserByIdRepository(userId);
// 
//     if(!user)
//         throw new Error("User not found");
// 
//     return user;
// }
// 
// async function updateUserService(newUser, userId){
//     const user = await userRepository.findUserByIdRepository(userId);
// 
//     if(!user)
//         throw new Error("User not found");
//     
//     if(newUser.password)
//         newUser.password = await bcrypt.hash(newUser.password, 10)
// 
//     const userUpdated = userRepository.updateUserRepository(userId, newUser)
// 
//     return userUpdated;
// }
// 
// async function deleteUserService(userId){
//     const user = await userRepository.findUserByIdRepository(userId);
// 
//     if(!user)
//         throw new Error("User not found");
// 
//     const {message} = await userRepository.deleteUserRepository(userId)
// 
//     return message;
// }

export default{
    createBookService
    , findAllBooksService
}