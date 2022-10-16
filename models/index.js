'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { createPostModel } = require('./post.model');
const { createComentModel } = require('./comment.model');
const { createUserModel } = require('./user.model');

require('dotenv').config();

const sequelizeOption = {};
const sequelize = new Sequelize(process.env.DATABASE_URL, sequelizeOption);

const usersTable = createUserModel(sequelize, DataTypes);
const postsTable = createPostModel(sequelize, DataTypes);
const commentsTable = createComentModel(sequelize, DataTypes);

usersTable.hasMany(postsTable, { foreignKey: 'userId', primaryKey: 'id' });
postsTable.belongsTo(usersTable, { foreignKey: 'userId', targetKey: 'id' });

postsTable.hasMany(commentsTable, { foreignKey: 'postId', primaryKey: 'id' });
commentsTable.belongsTo(postsTable, { foreignKey: 'postId', targetKey: 'id' });

usersTable.hasMany(commentsTable, { foreignKey: 'userId', primaryKey: 'id' });
commentsTable.belongsTo(usersTable, { foreignKey: 'userId', targetKey: 'id' });

sequelize.authenticate()
  .then(() => console.log(`sequelize.authenticate : Connected to suh database`))
  .catch(() => console.log(`sequelize.authenticate : Can't connect to suh database`))



module.exports = { sequelize, usersTable, postsTable, commentsTable };