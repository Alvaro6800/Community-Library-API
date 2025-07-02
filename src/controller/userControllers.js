import userService from "../service/userServices.js";
import {loginService} from "../service/authService.js";


async function createUserController(req, res){
    const newUser = req.body;

    try{
        const token = await userService.createUserService(newUser);
        res.status(201).send({token})
    }catch(e){
        res.status(400).send(e.message)    
    }
}

async function loginUserController(req, res){
    const {email, password} = req.body;

    try{
        const token = await loginService(email, password);
        res.send({token})
    }catch(e){
        res.status(400).send(e.message)    
    }
}

async function findAllUserController(req, res){
    try{
        const users = await userService.findAllUsersService();
        res.send({users})
    }catch(e){
        res.status(400).send(e.message)    
    }
}

async function findUserByIdController(req, res){
    const {id} = req.params;

    try{
        const user = await userService.findUsersByIdService(id);
        res.send({user});
    }catch(e){
        return req.status(404).send(e.message)
    }
}

async function updateUserController (req, res){
    const {id} = req.params;
    const newUser = req.body;

    try{
        const user = await userService.updateUserService(newUser, id);
        res.send({user});
    }catch(e){
        return res.status(404).send(e.message)
    }
}

async function deleteUserController (req, res){
    const {id} = req.params;
    console.log(id)

    try{
        const message = await userService.deleteUserService(id);
        res.send({message});
    }catch(e){
        return res.status(404).send(e.message)
    }
}


export default {
    createUserController
    , findAllUserController
    , findUserByIdController
    , updateUserController
    , deleteUserController
    , loginUserController
}