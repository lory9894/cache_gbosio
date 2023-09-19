let id;

window.onload = function() {
    id = GetURLParameter('id');
    showCoord(null,null, id);
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

function showCoord(ip, time, id) {
    console.log(ip, time, id);
    if (id >= 1 && id <= 8) {
    $("#robot").attr("src","images/"+ id + ".jpeg");
    }else{
        //todo: errore
    }
}