const mongoose = require("mongoose");
require('dotenv').config({ path: 'ENV_FILENAME' });


const db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
    //  useFindAndModify: false,
  })
  .then(() => {
    console.log("DB  connection successfull");
  })
  .catch((err) => (err, "no connection"));
