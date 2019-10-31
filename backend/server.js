// Imports the Dialogflow library
const https = require('https');
const express = require('express');
const app = express();
const json = require('./theobot-siqtvw-250df50c6c92.json');
const googleAuth = require('google-oauth-jwt');
const cors = require('cors');
const axios = require('axios');
/*
const bodyParser = require('body-parser');


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
*/
app.use(cors());
app.use(express.json({
    limit:'10mb'
}))
app.use(express.urlencoded({ extended: true }))

let accessToken;
const projectId = 'theobot-siqtvw';
const sessionId = `12345`;
const query = `Bonjour`;
const languageCode = 'fr-FR';
const outputFile = `myOutput.wav`;

const getToken = () => {
    return new Promise((resolve) => {
        googleAuth.authenticate(
            {
                email: json.client_email,
                key: json.private_key,
                scopes: [
                    'https://www.googleapis.com/auth/cloud-platform',
                    'https://www.googleapis.com/auth/dialogflow'
                ],
            },
            (err, token) => {
                resolve(token);
            }
        )
    })
}

function call(datas) {
    return axios.post(`https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent`, datas, {headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=utf-8'
    }});
}

app.get('/', function (req, res) {
    res.send('Assitant API v1.0');
})

app.post('/call', function (req, res) {
    getToken().then(
        (token) => {
            console.log('Token', token);
            accessToken = token;
        }
    );
    call(req.body).then(
        (result) => {
            // console.log('result', result.data)
            res.send(result.data);
        }
    ).catch(
        (error) => {
            console.log('Error', error.response.status);
            res.status(error.response.status).send(error.response.data)
        }
    )
})


// Récupère un token tout frais
getToken().then(
    (token) => {
        console.log('Token', token);
        accessToken = token;
    }
);

app.listen(3000, function () {
    console.log('Listening on 3000')
});