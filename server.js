const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const port = 8080;
app.use(cors());
const fetch = require("node-fetch"); //Dado que la función fetch no existe en Node, decidimos instalar la librería node-fetch para agregar esta funcionalidad 

app.get('/', function (req, res) {
    res.send('Hello there from covid tracker service!');
});

//Returns a JSON array with an element for each continent that has stats available.
app.get('/byContinent', (req, res) => {
    const url = 'https://corona.lmao.ninja/v2/continents?yesterday=true&sort';
    fetch(url)
        .then((response) => {
            if (response.status == 200) {
                return response.text();
            } else {
                return "error when fetching from API, status was not 200";
            }
        }).then((data) => {
            res.end(data);
        }).catch((err) => {
            res.status(err.status).end(err.message);
        });
});

//Returns a JSON array with an element for each country that has stats available.
app.get('/byCountry', (req, res) => {
    const url = 'https://corona.lmao.ninja/v2/countries?yesterday&sort';
    fetch(url)
        .then((response) => {
            if (response.status == 200) {
                return response.text();
            } else {
                return "error when fetching from API, status was not 200";
            }
        }).then((data) => {
            res.end(data);
        }).catch((err) => {
            res.status(err.status).end(err.message);
        });
});

//Get global stats: cases, deaths, recovered, time last updated, and active cases.
app.get('/global', (req, res) => {
    const url = 'https://corona.lmao.ninja/v2/all?yesterday';
    fetch(url)
        .then((response) => {
            if (response.status == 200) {
                return response.text();
            } else {
                return "error when fetching from API, status was not 200";
            }
        }).then((data) => {
            res.end(data);
        }).catch((err) => {
            res.status(err.status).end(err.message);
        });
});

app.listen(port, () => {
    console.log(`Backend Server covid info running on port ${port}`);
});