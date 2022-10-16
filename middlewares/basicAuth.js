'use strict';
const { usersTable } = require('../models');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function BasicAuth(req, res, next) {
  try {
    const BasicAuth = req.headers.authorization;
    const encodedUserData = BasicAuth.split(' ')[1];
    const userData = base64.decode(encodedUserData);
    const [username, password] = userData.split(':');
    const user = await usersTable.findOne({ where: { username: username } });
    if (user) {
      const passCheck = await bcrypt.compare(password, user.password);
      if (passCheck) {
        const token = jwt.sign({ username: username }, process.env.SECRET);
        user.token = token;
        req.user = user;
        next();
      } else {
        res.status(200).send('not weclome');
      }
    } else {
      res.status(403).send('username is wrong or not exist');
    }
  } catch (e) {
    next(`inside checkUser middleware : ${e}`);
  }
}

module.exports = { BasicAuth };