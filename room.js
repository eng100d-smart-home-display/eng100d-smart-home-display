window.onload = (event) => {
    var dt = new Date();
    var hours = dt.getHours();
    if(hours > 12){
        hours = hours - 12;
    }
    document.getElementById('time').innerHTML=String(hours) + ':' + String(dt.getMinutes());

    handle_data();
  };

  function handle_data() {
    fetch("./data/metasys_example_data.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        appendData(data.items);
      })
      .catch(function (err) {
      });

var dataList = []
function appendData(data) {
    var mainContainer = document.getElementById("my-data");
    dataList.push(['Time', 'KwH'])
    var count = 0;

    var max = -999;
    var lowest = 999;

    for (var i = 0; i < data.length; i++) {
      var dat = data[i].value.value / (1000000);
      count += dat;
      if (data[i].value.value > max) {
        max = data[i].value.value;
      }
      if (data[i].value.value < lowest) {
        lowest = data[i].value.value;
      }
      if (i % 12 == 0) {
        dataList.push([i / 12, count])
      }
    }
    var calcAvg = count /= data.length;
    console.log(count /= data.length); 
    console.log(max);
    var num = (dataList[dataList.length-2][1]);

    max = max / 1000000; 
    lowest = lowest/1000000;

    document.getElementById("total").innerHTML = num.toFixed(3) + ' kWh';
    document.getElementById("peak").innerHTML = max.toFixed(3) + ' kWh';
    document.getElementById("offpeak").innerHTML = lowest.toFixed(3) + ' kWh';
    document.getElementById("slope").innerHTML = calcAvg.toFixed(3) + ' kWh';




    // Make line of best fit, find slope of line of best fit, print out slope (this is the average kwh used in THAT day)
    //set hourly ticks
  


    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    }

  function drawChart() {
    var data = google.visualization.arrayToDataTable(dataList);

    var options = {
      title: 'electricity over time',
      curveType: 'function',
      legend: { position: 'bottom' },
      trendlines: { 0: {} },
      'width':1200,
  'height':800,
  series: {
    0: {
      visibleInLegend: false
    }
  },
  trendlines: {
    0: {
      visibleInLegend: true
    }
  },
      hAxis: {
        minValue: 0,
        maxValue: 24,
        ticks: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
    }
    };

    var slope;

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    var doc = document.getElementById('curve_chart');
    google.visualization.events.addListener(chart, 'ready', function () {
      var equation = $('text[text-anchor="start"][fill="#222222"]').text();
      console.log(equation);
      const myArray = equation.split(" ");
      slope = myArray[2];
      console.log(slope);
      //document.getElementById("slope").innerHTML = slope + ' kWh';


      chart.clearChart();


    });
  
    chart.draw(data, options);

  }
    
  
  }