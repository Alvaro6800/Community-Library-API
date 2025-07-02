import express from 'express'
import userRouters from './src/routes/userRoutes.js'
import bookRouters from './src/routes/bookRoutes.js'

const app = express()

// Permite que o app consiga transitar JSON.
app.use(express.json());
app.use(userRouters)
app.use(bookRouters)

const port = process.env.PORT || 3000;


app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});