const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Couldn't find an API for loan rates. Using Hardcoaded Data;
const UNSUBSIDIZED_LOAN_RATE = 0.03;
const RATE_DATA = {
  rate: UNSUBSIDIZED_LOAN_RATE
}

app.use(express.static(__dirname + "/public"))
app.get('/api/rate', (req, res) => res.json(RATE_DATA));
app.get('/', (req, res) => res.sendFile(path.resolve('public/index.html')));
app.listen(PORT, () => console.log(`Connected`));