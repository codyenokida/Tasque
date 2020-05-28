const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    index: {
        type: Number,
        required : true
    },
    todo : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Todo',TodoSchema);