const MongoClient = require('mongodb').MongoClient
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const connectionString = 'mongodb://127.0.0.1:27017';
// app.get('/', function(req, res) {
//     res.send('Hello World Test')
// })
app.use(bodyParser.urlencoded({ extended: true }))
app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    })
    // app.post('/quotes', (req, res) => {
    //     console.log('Hellooooooooooooooooo!', req.body)
    // })

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('star-wars-quotes');
        const quotesCollection = db.collection('quotes');
        app.post('/quotes', (req, res) => {
            quotesCollection.insertOne(req.body)
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
        });
        app.get('/find', (req, res) => {
            db.collection('quotes').find().toArray()
                .then(results => {
                    console.log(results)
                })
                .catch(error => console.error(error))
        });
    })
    .catch(error => console.error(error))

app.listen(3000, function() {
    console.log('listening on 3000');
})