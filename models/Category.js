const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    todos: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Todo'
    }]
});

module.exports = mongoose.model('Category', CategorySchema);