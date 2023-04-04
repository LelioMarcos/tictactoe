const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

const PORT = 1234;

app.get('/', (req, res) => {
    res.sendFile("views/velha.html", {root: __dirname});
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
