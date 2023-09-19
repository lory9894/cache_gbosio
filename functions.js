let id;

const options = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};

window.onload = function() {
    $.ajax({
        url: "https://worldtimeapi.org/api/ip",
        type: "GET",
        dataType: "json",
        success: function (data) {
            checkTime(data);
        }
    });
    id = GetURLParameter('id');
    id_given = showRobot(id);
    navigator.geolocation.getCurrentPosition(success, error, options);
    if (id_given)
        showCoord(null,null);
}
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

function showRobot(id) {
    if (id >= 1 && id <= 8) {
    $("#robot").attr("src","images/"+ id + ".jpeg");
    }else{
        //todo: errore
        return false;
    }
    return true;
}

function checkTime(data){
    var ora = data.datetime.split("T")[1].split(":")[0];
    $("#time").html("Sono le ore " + ora );
    if (ora >= 22 || ora <= 5) {

    }
}

function success(pos) {
  const crd = pos.coords;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  $("#your_coord").html("Le tue coordinate sono: " + crd.latitude + " " + crd.longitude + " con una precisione di " + crd.accuracy + " metri.");

}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}