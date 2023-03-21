var mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
var { Schema } = mongoose;

var Schema = new Schema({
    companyName:{
        required : true,
        type     : String
    },
    Date:{
        type     : Date
    },
    Purpose:{
        type : String,
        required : true
    },
    BookClosure:[{
        start:{
            type : DateOnly,
            required : true
        },
        end:{
            type : DateOnly,
            required : true 
        }
 } ],
 Agenda:{
    type : String,
            required : true
 }
    
},{timestamps    : true,versionKey:false});

Schema.path('companyName').validate(async (companyName) => {
    const nameCount = await mongoose.models.user.countDocuments({ companyName })
    return !nameCount
},'companyName already Exists');


var users = module.exports = mongoose.model('company',Schema);
module.exports.get = function(callback,limit){
    users.find(callback).limit(limit);
}