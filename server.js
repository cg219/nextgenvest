const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"))
app.get('/', (req, res) => res.sendFile(path.resolve('public/indexl.html')));
app.listen(PORT, () => console.log(`Connected`));