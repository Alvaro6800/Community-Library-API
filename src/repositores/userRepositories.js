import db from '../config/database.js'

db.run(`
    CREATE TABLE IF NOT EXISTS users(
        id  INTEGER PRIMARY KEY AUTOINCREMENT
        , username TEXT UNIQUE NOT NULL
        , email TEXT UNIQUE NOT NULL
        , password TEXT NOT NULL
        , avatar TEXT
    )    
`)

function createUserRepository(newUser){
    return new Promise((res, rej) => {
        const {username, password, email, avatar} = newUser;
        db.run(`
            INSERT INTO users (username, email, password, avatar)
            VALUES (?, ?, ?, ?) 
        `, [username, email, password, avatar], function (err)  {
            if(err)
                rej(err)
            else
                res({id: this.lastID, ...newUser})
        })
    })
}

function findUserByEmailRepository(userEmail){
    return new Promise((res,rej) => {
        db.get(`
            SELECT id, username, email, avatar, password
            FROM users
            WHERE email = ?   
        `, [userEmail], (err, row) => {
            if(err)
                rej(err)
            else
                res(row)
        })
    })
}

function findUserByIdRepository(userId){
    return new Promise((res,rej) => {
        db.get(`
            SELECT id, username, email, avatar 
            FROM users
            WHERE id = ?   
        `, [userId], (err, row) => {
            if(err)
                rej(err)
            else
                res(row)
        })
    })
}

function findAllUserRepository(){
    return new Promise((res, rej) => {
        db.all(`
            SELECT id, username, email, avatar FROM users
        `, [], (err, rows) => {
            if(err)
                rej(err)
            else
                res(rows)
        })
    })
}

function updateUserRepository(userId, user){
    return new Promise((res,rej) => {
        const fields = ['username', 'email', 'password', 'avatar'];
        const values = []
        let query = "UPDATE users SET"
        
        
        fields.forEach((field) => {
            if(user[field] !== undefined){
                query += ` ${field} = ?,`
                values.push(user[field])
            }
        })

        query = query.slice(0, -1);

        query += " WHERE id = ?"

        values.push(userId)

        db.run(query, values, (err) => {
            if(err)
                rej(err)
            else
                res({...user, userId})
        })
    })
}

function deleteUserRepository(userId){
    return new Promise((resolve, reject) => {
        db.run(`
            DELETE FROM users 
            WHERE id = ?   
        `, [userId], (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve({message: "User deleted successfully", userId})
            }
                
        })
    })
}

export default {
    createUserRepository
    , findUserByEmailRepository
    , findUserByIdRepository
    , findAllUserRepository
    , updateUserRepository
    , deleteUserRepository
}