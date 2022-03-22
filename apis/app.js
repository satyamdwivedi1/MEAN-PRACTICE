const express = require('express')
const cors = require("cors");
const app = express()
app.use(cors())

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


app.use(express.json());

const usersList = [
    {userId : 1, name : 'satyam', mobile : 9399874299, email : 'satyam@gmail.com'},
    {userId : 2, name : 'shubham', mobile : 9876543214, email : 'shubham@gmail.com'},
    {userId : 3, name : 'shivam', mobile : 987654321, email : 'satyam@gmail.com'},
    {userId : 4, name : 'vikram', mobile : 123456789, email : 'shubham@gmail.com'}
]

const PORT = 8000;


app.get('/', (req,res) => {
   res.send('you can get list of users from ' + ` localhost:${PORT}/users/get-user-list`) 
});

app.get('/users/get-user-list',(req,res) => {
    res.send(usersList)
});

app.get('/users/get-user/:userId',(req,res) => {
    const user = usersList.find(c => c.userId === parseInt(req.params.userId));
    res.send(user)
});

app.post('/users/add-user',(req,res) => {
    var id=1;
    for(let i =  1; i < usersList.length+1; i++){
        usersList.forEach(element=>{
            if(id == element.userId ){
                id += 1
            }
            else{
                return id
            }
        })
    }
    const user = {
        userId : id,
        name : req.body.name,
        email : req.body.email,
        mobile : req.body.mobile
    }
    usersList.push(user)
    res.send(user)
})

app.put('/users/get-user/:userId',(req,res) => {
    const user = usersList.find(c => c.userId === parseInt(req.params.userId));
    user.name = req.body.name
    user.email = req.body.email
    user.mobile = req.body.mobile
    res.send(user)
});

app.delete('/users/delete-user/:userId',(req,res) => {
    const user = usersList.find(c => c.userId === parseInt(req.params.userId));
    usersList.splice(usersList.indexOf(user),1)
    res.send(user)
})


app.listen(PORT,console.log(`server is listening ${PORT}`))