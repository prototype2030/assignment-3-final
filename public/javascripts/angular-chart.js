var app = angular.module('app', []);

app.controller('dataController', function($scope, $http) {
  $http.get("https://assignment-1-prototype2030.c9users.io/fertility-rates").then(function (response) {
    
      google.charts.load('current', {packages: ['corechart', 'bar']});
      google.charts.setOnLoadCallback(function() {
        formatDataTable(response.data);
      });
  });
});

function formatDataTable(chartdata) {
  var data = [];
  var header = ['Ethnicity', 'Average Fertility Rate'];
  
  data.push(header);
  
  for (var i = 0; i < chartdata.length; i++) {
    var temp = [];
    temp.push(chartdata[i]._id);
    temp.push(chartdata[i].value.avg);
    data.push(temp);
  }
  
  var g_data = google.visualization.arrayToDataTable(data);
  var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
  chart.draw(g_data, getOptions());
}

function getOptions()
{
     var options = {
        title: 'Average Fertility Rates by Ethnicity',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Average Fertility Rate',
          minValue: 0
        },
        vAxis: {
          title: 'Ethnicity'
        }
      };

    return options;
}

