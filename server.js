const express = require("express");
const bodyParser = require("body-parser");
const path = require('path')
const mongoose = require("mongoose");
const mongodb = require("mongodb")
const Items = require('./routes/api/items');
//const fs = require('fs-extra');
 //const MongoClient = require('mongodb').MongoClient;
 //const client = new MongoClient(require('./config/keys').mongoURI, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log("connected")
//   client.close();
// });

const app = express();
  // fs.copy('C:\Test', 'D:/fileTest/destination', err => {
  //   if (err) return console.error(err)
  //   console.log('success!')
  // })

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose.connect(db).then(()=> console.log('db Connected..'))
.catch(err => console.log(err)); 

app.use('/api/items', Items)

if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on port ${port}`))