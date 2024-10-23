const mongoose = require("mongoose");
const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require('axios')
const login = async (req, res) => {
  console.log("hey u r trying to login");
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ errorMessage: "Wrong email or password. hey" });
    const passwordCorrect = await bcrypt.compare(password, admin.passwordHash);
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    const token = jwt.sign(
      {
        user: admin._id,
      },
      process.env.JWT_SECRET
    );
    const expiryDate = new Date();
expiryDate.setDate(expiryDate.getDate() + 30);


    res
      .cookie("token", token, {
        httpOnly: true,
        path:'/',
        sameSite:"lax",
        secure:true
        

      })
      res.send("success")
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
};



const logout = async (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send();
};

const loggedin = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
};


const fetchReviews = async (req, res) => {
  const { token } = req.body;
  console.log(token)

  try {
    // Make request to Google My Business API
    const response = await axios.get(
      'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    res.json(response.data); // Send the reviews back to the client
  } catch (error) {
    console.log(error)
    res.status(200).json({ data: error });
  }
};




module.exports = { login, logout, loggedin, fetchReviews };
