// Require Libraries
const express = require('express');

const Tenor = require("tenorjs").client({
  // Replace with your own key
  "Key": "5LE3G7OYPLCN", // https://tenor.com/developer/keyregistration
  "Filter": "high", // "off", "low", "medium", "high", not case sensitive
  "Locale": "en_US", // Your locale here, case-sensitivity depends on input
});
// App Setup
const app = express();
// Middleware
const exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
// Routes
  app.get('/', (req, res) => {
    term = ""
    if (req.query.term) {
      term = req.query.term
    }
    Tenor.Search.Query(term, "10")
      .then(response => { 
        // store the gifs we get back from the search
        const gifs = response;
        // pass the gifs as an object into the home page
        res.render('home', { gifs })
      }).catch(console.error);
})
//     console.log(req.query) // => "{ term: hey" }
//     res.render('home')
// })

// Start Server

app.listen(3000, () => {
  console.log('Gif Search listening on port localhost:3000!');
});