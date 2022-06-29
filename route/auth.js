const express = require("express");
app = express()
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser');

app.use(express.json());


require("../db/connection");
const User = require("../db/models/userSchema");
//middleware

const middleware = (req, res, next) => {
  console.log("from middleware of about");
  next();
};

router.get("/", (req, res) => {
  res.send("hello from server fromm express router");
});

router.get("/home", (req, res) => {
  res.send("hello from home ");
});

router.get("/contact", (req, res) => {
  res.send("hello from contact");
});

router.get("/about", middleware, (req, res) => {
  res.send("hello from aboutMe");
});

// router.post("/signin", (req, res) => {
//   res.send("hello from Sign In plz log in");
//   const { email, password } = req.body;
//   console.log(req.body);
// });

router.post("/register", async (req, res) => {
  const { Name, lName,  email, password, cpassword } = req.body;
  const user = req.body
  console.log(user)

  console.log(email, password);

  if (!Name || !lName || !email || !password || !cpassword) {
    return res.status(422).json({ error: "please fill the from properly" });
  }

  try {
    console.log('1')
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res
        .status(422)
        .json({ error: "user with is email  alreay exists" });
    } else if (password !=cpassword) {
      return res.status(422).json({ error: "passwords are not matching" });
    } else {
      const user =  User({
        Name,
        lName,
        email,
        password,
        cpassword
        
      });

      
  
    }
    //hashing is applied here -->pre-save
   
    const newUser =  await new User(user);
    console.log("newuser")
    console.log(newUser)
   


    res.status(201).json({ message: "user registered successfully" });

  } catch (err) {
    console.log(err);
  }
});

//login
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    //   console.log(email, password);
    if (!email || !password) {
      return res.json({ message: "email and password both are required" });
    }

    const userLogin = await User.findOne({ email: email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        return res.json({ message: "invalid credinentials" });
      } else {
        return res.json({ message: "Login Successfull" });
      }
    } else {
      res.status(400).json({ error: "invalid credinentials" });
    }
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: "failed to register!! try again" });
  }
});

module.exports = router;
