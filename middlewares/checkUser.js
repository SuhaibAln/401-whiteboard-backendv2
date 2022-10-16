'use strict';
const { usersTable } = require('../models');
const bcrypt = require('bcrypt');

async function checkUser(req, res, next) {
  try {
    let userByname = await usersTable.findOne({ where: { username: req.body.username } });
    let userByEmail = await usersTable.findOne({ where: { email: req.body.email } });
    if (userByname) {
      next('username is taken');
    } else if (userByEmail) {
      next('email is taken');
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      next();
    }
  } catch (e) {
    next(`inside checkUser middleware : ${e}`);
  }
}

module.exports = { checkUser };