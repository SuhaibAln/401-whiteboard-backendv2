'use strict';

const express = require('express');

const { usersTable } = require('../models/index');
const { checkUser } = require('../middlewares/checkUser');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { BasicAuth } = require('../middlewares/basicAuth');
const router = express.Router();


router.post('/signup', checkUser, handleSignUp);

router.post('/signin', BasicAuth, handleSignin);


async function handleSignUp(req, res, next) {
  try {
    usersTable.create(req.body)
      .then(() => res.send('done'))
      .catch(() => res.send('somthing bad'));
  } catch (e) {
    next(`inside handleSignUp function : ${e}`);
  }
}

async function handleSignin(req, res, next) {
  try {
    res.status(200).send(req.user);
  } catch (e) {
    next(`inside handleSignin function : ${e}`);
  }
}

module.exports = router;