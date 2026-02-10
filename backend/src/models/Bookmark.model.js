const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
    title : {
        type :String,
        required : true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    description : {
        type : String,
        default : '',
    },
    tags:{
        type : [String],
        default : [],
    },
    favorite : {
        type : Boolean,
        default : false,
    },
},{
    timestamps : true,
});

const Bookmark = mongoose.model('Bookmark',bookmarkSchema);

module.exports = Bookmark;