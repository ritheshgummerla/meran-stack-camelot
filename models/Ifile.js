
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const IfileSchema = new Schema({
    objectKey: {
        type: Number,
        required: true
    },
    objectTypeId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Ifile = mongoose.model('ifile', IfileSchema);

module.exports = Ifile;