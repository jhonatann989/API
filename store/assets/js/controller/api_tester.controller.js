$(document).ready(function() {
    $("#resultadoBusqueda").html('<p>JQUERY VACIO</p>');
    $("#resultadoLogin").html('<p>Log Login</p>');
});

function login () {

    var user = {
        user      : $("input#name").val(),
        pass      : $("input#pass").val(),
        level     : $("#level").val(),
        operation : "login"
    }

    $.post("API/api.php", { 

        user: user 

    }, function(mensaje) {
        $("#resultadoLogin").html(mensaje);
     });
}




function buscar () {

    var user = {
        operation : "fetch",
    };

    var datos = {
        tipo      : $("#tipo").val(),
        tabla     : $("#tabla").val(),
        datos     : $("#datos").val(),
        condicion : $("#condicion").val(),
        apendice  : $("#apendice").val()
    };
    /*
    var object = $.get("API/api.php", {

        datos: datos

    }, function(mensaje) {

        var obj = $.parseJSON(mensaje);
        console.log(obj);
        $("#resultadoBusqueda").html(mensaje);


     }); 
     */


    var mivar = lego.ajax("get", user, datos);

    console.log(mivar);

   /* for (var mi2var in mivar) {

        console.log(mi2var);
    } */

   

};

