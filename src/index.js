const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const users = {};

app.post('/users', (req, res)=>{
    const {name, email} = req.body;

    if(!name || !email) {
        res.status(400).json({
            error: "Missing name and/or email"
        });
    }

    const id = uuidv4();
    users[id] = {
        name: name,
        email: email
    };
    
    res.status(201).json({
        id: id,
        name: users[id].name,
        email: users[id].email
    });
});

app.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    
    if(users[id]) {
        res.status(200).json({
            id: id,
            name: users[id].name,
            email: users[id].email
        })
    } 
    else {
        res.status(404).json({
            error: "User ID not found"
        })
    }

})

app.get('/users/', (req, res)=>{
    res.status(200).json(users)
})

app.put('/users/:id', (req, res)=>{
    const {name, email} = req.body;
    const id = req.params.id;

    if(!name || !email) {
        res.status(400).json({
            error: "Missing name and/or email"
        });
    }
    else if(!users[id]) {
        res.status(404).json({
            error: "User ID not found"
        });
    }

    users[id].name = name;
    users[id].email = email;

    res.status(200).json({
        id: id,
        name: users[id].name,
        email: users[id].email
    });
})

app.delete('/users/:id', (req,res)=>{
    const id = req.params.id;
    
    if(!users[id]) {
        res.status(404).json({
            error: "User ID not found"
        });
    }

    delete users[id];
    res.sendStatus(204);
})
// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing