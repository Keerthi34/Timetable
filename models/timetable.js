var mongoose=require('mongoose');

var Schema = mongoose.Schema;


var schema= new Schema({
    "School_Id" : {type:String},
    "Class_Id" : {type:String},
    "Teacher_Id":{type:String},
    "Subject":{type:String},
    "Time_in": {type:String},
    "Time_out":{type:String},
    "Day":{type:String},
    "Class_Teacher":{type:String}

})

module.exports=mongoose.model('time_table',schema);
