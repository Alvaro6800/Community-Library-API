import bookService from "../service/bookServices.js";

async function createBookController(req, res){
    const newBook = req.body;
    const userId = req.userId

    try{
        const createdBook = await bookService.createBookService(newBook, userId);
        res.status(201).send({createdBook})
    }catch(e){
        res.status(400).send(e.message)    
    }
}

async function findAllBooksController(req, res){
    try{
        const books = await bookService.findAllBooksService();
        res.send({books})
    }catch(e){
        res.status(400).send(e.message)    
    }
}

async function findBookByIdController(req, res){
    const {id} = req.params;

    try{
        const book = await bookService.findBookByIdService(id);
        res.send({book});
    }catch(e){
        res.status(404).send(e.message)
    }
}

async function updateUserController (req, res){
    const bookId = req.params.id;
    const updatedBook = req.body;
    const userId = req.userId

    try{
        const book = await bookService.updateBookService(updatedBook, bookId, userId);
        res.send({book});
    }catch(e){
        return res.status(404).send(e.message)
    }
}

async function deleteBookController (req, res){
    const bookId = req.params.id;
    const userId = req.userId;

    try{
        const message = await bookService.deleteBookService(bookId, userId);
        res.send({message});
    }catch(e){
        return res.status(404).send(e.message)
    }
}

async function searchBooksController(req, res){
    const {search} = req.query;

    try{
        const books = await bookService.searchBooksService(search);
        res.send(books)
    }catch(e){
        return res.status(404).send(e.message)
    }
}

export default{
    createBookController
    , findAllBooksController
    , findBookByIdController
    , updateUserController
    , deleteBookController
    , searchBooksController
}