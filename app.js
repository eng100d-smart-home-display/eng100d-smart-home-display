
button = document.getElementById("get-data");
button.addEventListener("click", (event) => {
  handle_data();
});

var dataList = []

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
  function appendData(data) {
    var mainContainer = document.getElementById("my-data");
    dataList.push(['Time', 'KwH'])
    var count = 0;

    for (var i = 0; i < data.length; i++) {
      var dat = data[i].value.value / (1000000);
      count += dat;
      if (i % 12 == 0) {
        dataList.push([i / 12, count])
      }
    }

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
      'width':1500,
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

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    google.visualization.events.addListener(chart, 'ready', function () {
      var equation = $('text[text-anchor="start"][fill="#222222"]').text();
      console.log(equation);
    });
  
    chart.draw(data, options);
  }
    
  }

