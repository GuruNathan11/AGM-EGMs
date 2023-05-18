var mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
var { Schema } = mongoose;

var Schema = new Schema({
    companyName:{
        required : true,
        type     : String
    },
    date:{
        type     : String
    },
    purpose:{
        type : String,
        required : false
    },
     bookClosureStart:{
            type : String,
            required : false
   },
    bookClosureEnd:{
            type : String,
            required : false 
        },
 agenda:{
    type : String,
            required : false
 }
    
},{timestamps    : true,versionKey:false});

// Schema.path('companyName').validate(async (companyName) => {
//     const nameCount = await mongoose.models.company.countDocuments({ companyName })
//     return !nameCount
// },'companyName already Exists');


var users = module.exports = mongoose.model('company',Schema);
module.exports.get = function(callback,limit){
    users.find(callback).limit(limit);
}
