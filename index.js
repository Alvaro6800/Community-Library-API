import express from 'express'
import {routers} from './src/routes/index.js'
import './src/service/cronService.js'

const app = express()

// Permite que o app consiga transitar JSON.
app.use(express.json());
app.use(routers)


const port = process.env.PORT || 3000;


app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});