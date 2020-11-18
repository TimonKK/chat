'use strict'

const mongoose = require('./mongoose');

mongoose.User = require('./model/user');
mongoose.Group = require('./model/group');
mongoose.UserGroup = require('./model/user_group');
mongoose.Message = require('./model/message');

module.exports = mongoose;
