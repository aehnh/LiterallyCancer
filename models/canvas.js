/**
 * Created by q on 2017-01-06.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var canvasSchema = new Schema({
    title: String,
    snapshotJSON: String,
    dataURL: String,
    whose: String,
    description: String
});

module.exports = mongoose.model('canvas', canvasSchema);