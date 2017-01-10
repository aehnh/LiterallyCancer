/**
 * Created by q on 2017-01-09.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({

});

module.exports = mongoose.model('user', userSchema);
