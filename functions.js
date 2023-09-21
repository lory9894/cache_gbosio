let id;
const debug = false;

const options = {
  enableHighAccuracy: true,
  timeout: 60000,
  maximumAge: 0
};

window.onload = function() {
    let promises = [];
    promises.push(
    $.ajax({
        url: "https://worldtimeapi.org/api/ip",
        type: "GET",
        dataType: "json"
    }));
    promises.push(getPosition());
    id = GetURLParameter('id');
    id_given = showRobot(id);
    if (id_given) {
        Promise.all(promises).then(function(values) {
            showCoord(id, values[1], values[0]);
        });
    }
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
        $("#message").text("Robot non trovato\n smettila di giocare con i parametri dell'url.");
        $("#message").html($("#message").html().replace(/\n/g,'<br/>'));
        return false;
    }
    return true;
}

function checkTime(data){
    var ora = data.datetime.split("T")[1].split(":")[0];
    if (debug) {
        console.log(ora);
        return true;
    }
    if (ora >= 22 || ora <= 5) {
        return true;
    }
    $("#message").text("Non è ora di fare certi discorsi\n ripassa più tardi");
    $("#message").html($("#message").html().replace(/\n/g,'<br/>'));
    return false;
}
function checkCoord(coord) {
    //fittizie: N45.13892 E007.38268
    // pitagora for the win
    var distance = Math.sqrt(Math.pow(coord.latitude - 45.13892, 2) + Math.pow(coord.longitude - 7.38268, 2));
    if (debug) {
        console.log(coord.latitude);
        console.log(coord.longitude);
        console.log(distance)
        return true;

    }
    if (distance <= 0.001) { // 0.001 = 100m circa
        return true;
    }
    $("#message").text("INSERIRE TESTO PER TROPPO DISTANTE");
    $("#message").html($("#message").html().replace(/\n/g,'<br/>'));
    return false
}
function getPosition() {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    });
}

function showCoord(id, geolocationPosition, date) {
    if (checkTime(date) && checkCoord(geolocationPosition.coords)) {
        switch (id){
            case "1":
                $("#message").text("coordinata 1");
                break;
            case "2":
                $("#message").text("coordinata 2");
                break;
            case "3":
                $("#message").text("coordinata 3");
                break;
            case "4":
                $("#message").text("coordinata 4");
                break;
            case "5":
                $("#message").text("coordinata 5");
                break;
            case "6":
                $("#message").text("coordinata 6");
                break;
            case "7":
                $("#message").text("coordinata 7");
                break;
            case "8":
                $("#message").text("coordinata 8");
                break;

                default:
$("#message").text("Robot non trovato\n smettila di giocare con i parametri dell'url.");
                break;

        }
    $("#message").html($("#message").html().replace(/\n/g,'<br/>'));
    }
}
