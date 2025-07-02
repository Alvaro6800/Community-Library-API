import db from '../config/database.js'

db.run(`
    CREATE TABLE IF NOT EXISTS loans(
        id  INTEGER PRIMARY KEY AUTOINCREMENT
        , userId INTEGER UNIQUE NOT NULL
        , bookId INTEGER UNIQUE NOT NULL
        , dueDate DATE
        , FOREIGN KEY (userId) REFERENCES users(id)
        , FOREIGN KEY (bookId) REFERENCES books(id) 
    )    
`);

function createLoanRepository(userId, bookId, dueDate){
    return new Promise((res, rej) => {
        db.run(`
            INSERT INTO loans (userId, bookId, dueDate)
            VALUES (?, ?, ?) 
        `, [userId, bookId, dueDate], function (err)  {
            if(err)
                rej(err)
            else
                res({id: this.lastID, bookId, userId, dueDate})
        })
    })
}

function findAllLoansRepository(){
    return new Promise((res, rej) => {
        db.all(`
            SELECT * FROM loans
        `, [], (err, rows) => {
            if(err)
                rej(err)
            else
                res(rows)
        })
    })
}

function findLoanByIdRepository(loanId){
    return new Promise((res,rej) => {
        db.get(`
            SELECT *
            FROM loans
            WHERE id = ?   
        `, [loanId], (err, row) => {
            if(err)
                rej(err)
            else
                res(row)
        })
    })
}

function deleteLoanRepository(loanId){
    return new Promise((resolve, reject) => {
        db.run(`
            DELETE FROM loans 
            WHERE id = ?   
        `, [loanId], (err) => {
            if(err){
                reject(err)
            }
            else{
                resolve({message: "Loan deleted successfully", loanId})
            }
                
        })
    })
}

export default {
    createLoanRepository
    , findAllLoansRepository
    , findLoanByIdRepository
    , deleteLoanRepository
}

