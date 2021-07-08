import express from 'express';
import loadJson from 'load-json-file';

export const usersRouter = express.Router();
let users = loadJson.sync('./data/users.json'); //Saving the data  from the wanted file to a variable 



usersRouter.get("/", (req, res) => {//Get all users
                              //No need to " "/users",  (req, res)", only "/" (req, res). because "/users" is defined in server.mjs app.use('/users', usersRouter);

    res.send(users);//Using loadJson to get the data from products.json file 
});

//Create user 
usersRouter.post("/", (req, res) => {//If we want to create a new user we use post instead of get
                               //No need to " "/users",  (req, res)", only (req, res). because "/users" is defined in server.mjs app.use('/users', usersRouter);
    users.push(req.body);//"users" is an array, so we can push a new object to it, each product is an object
                            //express doesn't know how to deal with adding objects so we use body that came with express
                            //it parses the object                  

    res.send("added");
});

//Get single user from the users array 
usersRouter.get("/:acountNumber", (req, res) => {//If we want to see a single user by its acountNumber, we use :acountNumber , we save whatever is writen after users/ and saves it in acount-number variable (can call "acount-number" whatever instead)
                                                 //don't need to write "/users/:acountNumber", only "/:id", because /products is defined in users.mjs app.use('/users', usersRouter);;
    let [user] = users.filter(user => user.acountNumber == req.params.acountNumber);//"products" is an array so we filter it by id. the distructuring is to get a single object and not an array with a single object
                                                                          //params.id gets the :productId variable
    res.send(user);
});

//Update single user 
usersRouter.put("/:acountNumber", (req, res) => {//If we want to update a product we use put instead of get. we use :id to save whatever is writen after products/ and saves it in id variable (can call "id" whatever instead)
    let [user]= users.filter(user => user.acountNumber == req.params.acountNumber);//"users" is an array so we filter it by acount-number. the distructuring is to get a single object and not an array with a single object
    user.name = req.query.name, //So through the query string  we can reach it's values and change them
    user.age = req.query.age,
    user.acountNumber = req.query.acountNumber
    res.send("updated");
});

//Delete single user
usersRouter.delete("/:acountNumber", (req, res) => {//If we want to delete a user we use delete instead of get
    users = users.filter(user => user.acountNumber != req.params.acountNumber);//"users" is an array so we filter it by acountNumber. 
    res.send("deleted");
});