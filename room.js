window.onload = (event) => {
    var dt = new Date();
    var hours = dt.getHours();
    if(hours > 12){
        hours = hours - 12;
    }
    document.getElementById('time').innerHTML=String(hours) + ':' + String(dt.getMinutes());
  };