const dotenv = require("dotenv");
const express = require("express");   
const mongoose = require('mongoose')
//  const bodyParser = require('body-parser');
const app = express();

app.use(express.json());

dotenv.config({ path: "./config.env" });

const User = require("./db/models/userSchema");

// //app.use(express.json());
// app.use(bodyParser.json({ limit : "30mb",extended: true }));
// app.use(bodyParser.urlencoded({ limit : "30mb",extended: true }));
const route = require("./route/auth");


// app.use(bodyParser.json());
app.use(route);

const db = process.env.DATABASE;

const PORT = process.env.PORT;
console.log(db)

require("./db/connection");

mongoose
  .connect(db, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    //  useFindAndModify: false,
  }).then(app.listen(PORT, () => {
    console.log("DB  connection successfull");
    console.log(" connected successfully at port 5000");
  })).catch((err) => console.log(err, "no connection"));


