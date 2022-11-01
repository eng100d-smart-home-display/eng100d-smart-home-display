button = document.getElementById("get-data");
button.addEventListener("click", (event) => {
  handle_data();
});

function handle_data() {
  fetch("data/metasys_example_data.json")
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
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
      var div = document.createElement("div");
      console.log(data[i]);
      div.innerHTML = `Milliwatts: ${data[i].value.value}, Date: ${data[i].timestamp}, Reliable: ${data[i].isReliable}`;
      mainContainer.appendChild(div);
    }
  }
}
