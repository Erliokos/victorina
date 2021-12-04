const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config();
const session = require('express-session');
const cors = require("cors");
const FileStore = require('session-file-store')(session)

const PORT = process.env.PORT || 3002

app.use(cors({
  origin:true,
  credentials:true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    store: new FileStore(),
    key: 'sid',
    secret: 'sdwderweeggrp',
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    cookie: { expires: 24 * 24 * 60e3 },
  })
)
app.use((req, res, next) => {
  res.locals.user = req.session.user
  next() //res.locals глобальная переменная, req.session заполняется из сессии
})

app.get('/exit',(req,res)=>{
  req.session.destroy();
  res.clearCookie("sid");
  res.redirect("/");
})


app.listen(PORT, () => console.log(`Server has been started on PORT:${PORT}`))
