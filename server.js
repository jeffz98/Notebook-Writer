const express = require('express');
const fs = require('fs');
const path = require('path');
// Helper method for generating unique ids
const notes = require('./db/db.json');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);
// GET request for reviews
app.get('/api/notes', (req, res) => {
  // Send a message to the client

  console.log(notes);
  res.json(notes);
  
});

// GET request for a single review
// GET - /api/reviews/13
// app.get('/api/reviews/:review_id', (req, res) => {
//   console.log(req.query.list)
//   console.log("req.body", req.body);
//   console.log("req.params.review_id", req.params.review_id);
//   if (req.body && req.params.review_id) {
//     console.info(`${req.method} request received to get a single a review`);
//     const reviewId = req.params.review_id;
//     for (let i = 0; i < reviewList.length; i++) {
//       const currentReview = reviewList[i];
//       if (currentReview.review_id === reviewId) {
//         res.json(currentReview);
//         return;
//       }
//     }
//     res.json('Review ID not found');
//   }
// });

// POST request to add a review
app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
  const { id, title, text } = req.body;

    const newNote = {
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

// // GET request for upvotes
// app.get('/api/upvotes', (req, res) => {
//   // Inform the client
//   res.json(`${req.method} request received to retrieve upvote count`);

//   // Log our request to the terminal
//   console.info(`${req.method} request received to retrieve upvote count`);
// });

// Post request to upvote a review


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
