const express = require('express');
const shortid = require('shortid');
const server = express();

server.use(express.json());

//setting up a basic get end point to read on localhost
server.get('/', (req, res) => {
    res.send('<h1> Hello Francisco </h1>')
})

const PORT = 8000

server.listen(PORT, () => console.log(`server is running on port ${PORT}`))

let userInfo = [
    {
        id: shortid.generate(),
        name: 'Francisco Barrios',
        bio: 'That one guy who does things'
    },
    {
        id: shortid.generate(),
        name: 'Marta',
        bio: 'That one girl who bugs me'
    }
]

//start of our CRUD operations

//basic get for read purposes


//POST
server.post('/api/users', (req, res) => {
    const newUserInfo = req.body; //needs express.json() middleware
    newUserInfo.id = shortid.generate()


    if (!newUserInfo.name || !newUserInfo.bio) {
        res.status(400).json({ message: "need a name and bio value" })
    } else {
        userInfo.push(newUserInfo)
        res.json(newUserInfo)
        res.status(201).json({ message: "Your user was created" })
    }
    res.status(500).json({ errorMessage: 'The user information could not be retrieved.' })

})

//GET
server.get('/api/users', (req, res) => {
    try {
        return res.json(userInfo)
    } catch {
        return res.status(500).json({ errorMessage: 'The users information could not be retrieved' })
    }
})

//GET by :id
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    let found = userInfo.find(u => u.id === id)

    if (found) {
        res.json(found)
    } else {
        res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })
    }
    res.status(500).json({ errorMessage: 'The user information could not be retrieved.' })
})

//DELETE
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const deleted = userInfo.find(u => u.id === id)

    if (deleted) {
        userInfo = userInfo.filter(u => u.id !== id)
        res.status(201).json({ message: 'The user was deleted', deleted })

    } else {
        res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })

    }
    res.status(500).json({ errorMessage: 'The user information could not be retrieved.' })

    res.json(deleted)
})

//PUT
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    let found = userInfo.find(u => u.id === id)
    if (!changes.name || !changes.bio) {
        res.status(400).json({ errorMessage: "Please provide a name and bio for the user" })
    }

    else if (found) {
        Object.assign(found, changes)
        res.status(200).json(found)
    } else {
        res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
    }
    res.status(500).json({ errorMessage: "The user information could not be modified." })

})




