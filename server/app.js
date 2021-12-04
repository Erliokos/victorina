const express = require('express');
const app = express();
const path = require('path');
require("dotenv").config();
const session = require('express-session');
const cors = require("cors");
const FileStore = require('session-file-store')(session)

const authRouter = require('./src/routes/auth.router')
const usersRouter = require('./src/routes/users.router')

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


app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)


app.listen(PORT, () => console.log(`Server has been started on PORT:${PORT}`))
