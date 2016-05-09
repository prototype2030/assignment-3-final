var mongoose = require('mongoose');
var FertilityRateSchema = new mongoose.Schema({
  _id : String,
  value : {
    totalFertilityRate : Number,
    num : Number,
    avg : Number,
  },
},
{
    collection: 'fertility_by_race'
});
mongoose.model('FertilityRate', FertilityRateSchema);
/*
{ "_id" : "American Indian/Alaska Native", 
  "value" : { 
    "totalFertilityRate" : 1404.5, 
    "num" : 24, 
    "avg" : 58.520833333333336
    } 
}
*/