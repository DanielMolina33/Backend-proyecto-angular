'use strict'

let mongoose = require('mongoose');
let schema = mongoose.Schema;
let projectSchema = schema({
    name:String,
    description:String,
    category:String,
    langs:String,
    year:Number,
    image:String
});

module.exports = mongoose.model('Project', projectSchema);