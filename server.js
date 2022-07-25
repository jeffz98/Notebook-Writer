const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// GET request for notes
app.get('/api/notes', (req, res) => {
  // Send a message to the client

  console.log(notes);
  res.json(notes);
  
});


// POST request to add a note
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
  const { id, title, text } = req.body;

    const newNote = {
      // uuid 
      id: Math.floor(Math.random()* 1000000),
      title,
      text,
      
    };
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.json(response);
});



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
