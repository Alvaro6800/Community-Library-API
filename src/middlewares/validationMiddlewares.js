import { userIdSchema } from "../schema/userSchema.js";
import { bookIdSchema } from "../schema/bookSchema.js";
import { loanIdSchema } from "../schema/loanSchema.js";


const validate = (schema) => (req, res, next) => {
    try{
        schema.parse(req.body);
        next()
    }catch(e){
        res.status(400).json({error: e.errors})
    }
}

const validateUserId = (req, res, next) => {
    try{
        const {id} = req.params
        const userId = +id
        userIdSchema.parse({userId: userId});
        next()
    }catch(e){
        res.status(400).json({error: e.errors})
    }
}

const validateBookId = (req, res, next) => {
    try{
        const {id} = req.params
        const bookId = +id
        bookIdSchema.parse({bookId: bookId});
        next()
    }catch(e){
        res.status(400).json({error: e.errors})
    }
}

const validateLoanId = (req, res, next) => {
    try{
        const {id} = req.params
        const loanId = +id
        loanIdSchema.parse({loanId: loanId});
        next()
    }catch(e){
        res.status(400).json({error: e.errors})
    }
}

export {validate, validateUserId, validateBookId, validateLoanId};