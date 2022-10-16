'use strict';
const { usersTable } = require('../models');
const jwt = require('jsonwebtoken');

async function BearerAuth(req, res, next) {
  try {
    const bearer = req.headers.authorization;
    const token = bearer.split(' ')[1];
    const data = jwt.verify(token, process.env.SECRET);
    const username = data.username;
    const user = await usersTable.findOne({ where: { username: username } });
    if (user) {
      next();
    }else {
      res.status(403).send('invalid token');
    }
  } catch (e) {
    next(`inside checkUser middleware : ${e}`);
  }
}

module.exports = { BearerAuth };