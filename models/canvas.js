/**
 * Created by q on 2017-01-06.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var canvasSchema = new Schema({
    snapshotJSON: String
});

module.exports = mongoose.model('canvas', canvasSchema);