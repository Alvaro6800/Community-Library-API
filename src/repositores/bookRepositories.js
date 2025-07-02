import db from '../config/database.js'

db.run(`
    CREATE TABLE IF NOT EXISTS books(
        id  INTEGER PRIMARY KEY AUTOINCREMENT
        , title TEXT  NOT NULL
        , author TEXT NOT NULL
        , userId INTEGER
        , FOREIGN KEY (userId) REFERENCES users(id)
    )    
`)

function createBookRepository(newBook, userId){
    return new Promise((res, rej) => {
        const {title, author} = newBook;
        db.run(`
            INSERT INTO books (title, author, userId)
            VALUES (?, ?, ?) 
        `, [title, author, userId], function (err)  {
            if(err)
                rej(err)
            else
                res({id: this.lastID, ...newBook})
        })
    })
}

function findAllBooksRepository(){
    return new Promise((res, rej) => {
        db.all(`
            SELECT * FROM books
        `, [], (err, rows) => {
            if(err)
                rej(err)
            else
                res(rows)
        })
    })
}

// function findUserByEmailRepository(userEmail){
//     return new Promise((res,rej) => {
//         db.get(`
//             SELECT id, username, email, avatar, password
//             FROM users
//             WHERE email = ?   
//         `, [userEmail], (err, row) => {
//             if(err)
//                 rej(err)
//             else
//                 res(row)
//         })
//     })
// }
// 
// function findUserByIdRepository(userId){
//     return new Promise((res,rej) => {
//         db.get(`
//             SELECT id, username, email, avatar 
//             FROM users
//             WHERE id = ?   
//         `, [userId], (err, row) => {
//             if(err)
//                 rej(err)
//             else
//                 res(row)
//         })
//     })
// }
// 
// function updateUserRepository(userId, user){
//     return new Promise((res,rej) => {
//         const fields = ['username', 'email', 'password', 'avatar'];
//         const values = []
//         let query = "UPDATE users SET"
//         
//         
//         fields.forEach((field) => {
//             if(user[field] !== undefined){
//                 query += ` ${field} = ?,`
//                 values.push(user[field])
//             }
//         })
// 
//         query = query.slice(0, -1);
// 
//         query += " WHERE id = ?"
// 
//         values.push(userId)
// 
//         db.run(query, values, (err) => {
//             if(err)
//                 rej(err)
//             else
//                 res({...user, userId})
//         })
//     })
// }
// 
// function deleteUserRepository(userId){
//     return new Promise((resolve, reject) => {
//         db.run(`
//             DELETE FROM users 
//             WHERE id = ?   
//         `, [userId], (err) => {
//             if(err){
//                 reject(err)
//             }
//             else{
//                 resolve({message: "User deleted successfully", userId})
//             }
//                 
//         })
//     })
// }

export default {
    createBookRepository
    , findAllBooksRepository
}