
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
      console.log(data.items);
      appendData(data.items);
    })
    .catch(function (err) {
      console.log("error: " + err);
    });
  function appendData(data) {
    j = 0
    var mainContainer = document.getElementById("my-data");
    dataList.push(['time', 'watts'])
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      console.log(data[i]);
      div.innerHTML = `Milliwatts: ${data[i].value.value}, Date: ${data[i].timestamp}, Reliable: ${data[i].isReliable}`;
      mainContainer.appendChild(div);
      var dateTime = new Date(data[i].timestamp).getTime();

      if (i % 12 == 0) {
        dataList.push([j, (data[j].value.value)/1000])
        j++
      }
    }

    console.log(dataList)
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    var data = google.visualization.arrayToDataTable(dataList);

    var options = {
      title: 'electricity over time',
      curveType: 'function',
      legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(data, options);
  }
    
  }
}
