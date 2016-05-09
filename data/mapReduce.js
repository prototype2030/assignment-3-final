mongoimport --db birth_rates --collection fertility_collection --type json --file data.json --jsonArray

m = function () {
  emit( this.Race , { totalFertilityRate : this.FertilityRate , num : 1 } );
};

r = function (name, values) {
  var n = {totalFertilityRate : 0, num : 0};
  for (var i = 0; i < values.length; i++) {
    n.totalFertilityRate += values[i].totalFertilityRate;
    n.num += values[i].num;
  }
  return n;
};


f = function(who, res){
  res.avg = res.totalFertilityRate / res.num;
  return res;
};

db.tasks.mapReduce( m, r, { finalize : f, out : {inline : 1} });

db.orders.mapReduce( mapFunction2,
                     reduceFunction2,
                     {
                       out: "fertility_counts_by_race",
                       finalize: finalizeFunction2
                     }
                   )