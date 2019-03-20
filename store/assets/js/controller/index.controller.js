$(document).ready(function() {

    $("#loading").fadeOut();
    $("#container").fadeIn();

    $("#navbar").append(lego.navbar());

    var user  = "";
    var datos = "";

    user  = {
         operation : "fetch" 
     };

    datos =  { 
        tipo : "select", 
        tabla : "tipo", 
        condicion : "1" 
    };

    var leftNav = lego.ajax("get", user, datos);

    if (!leftNav["error"]) {

            $("#leftNav").append(lego.leftNav(leftNav, "loadProductCatalog"));
        } else {

            $("#leftNav").append("Imposible acceder al recurso. Causa: " + leftNav["error"]["fetch"]);
    };
    //---------------------------------------------------------------------------------------------------
    datos =  { 
        tipo : "select", 
        tabla : "productos", 
        condicion : "id_tipo = 7", 
        apendice : "limit 0,6"
    };

    var kitSlideConstructor = lego.ajax("get", user, datos);

    if (!kitSlideConstructor["error"]) {
                $("#kitSlideConstructor").append(lego.kitSlideConstructor(kitSlideConstructor));
            } else {
                
                $("#kitSlideConstructor").append("Imposible acceder al recurso. Causa: " + kitSlideConstructor["error"]["fetch"]);
        };
    //---------------------------------------------------------------------------------------------------
   
    datos =  { 
        tipo : "join", 
        tabla : "productos.id_caracteristicas, caracteristicas", 
        condicion : "productos.id_tipo = 1", 
        apendice : "limit 0,6"
    };

    var camaras = lego.ajax("get", user, datos);

    if (!camaras["error"]) {

                var element = '<h3>Camaras</h3>';
                element = element + '<div class="row">';

                for (var i = 0; i < camaras.length; i++) {
                    if (i == 3) {
                        element = element + '</div><div class="row">';
                    }

                    element = element + '<div class="col-md" id="element'+i+'">';
                    element = element + lego.simpleItemDescriptor(camaras[i], "block");
                    element = element + '</div>';
                };

                element = element + '</div>';
                element = element + '<hr>';


                $("#productos").append(element);

            } else {

                $("#productos").append("Imposible acceder al recurso. Causa: " + camaras["error"]["fetch"]);

            };

    //----------------------------------------------------------------------------------------------------------- 

    datos =  { 
        tipo : "join", 
        tabla : "productos.id_caracteristicas, caracteristicas", 
        condicion : "productos.id_tipo = 2", 
        apendice : "limit 0,6"
    };

    var dvr = lego.ajax("get", user, datos);
    
    if (!dvr["error"]) { 
        var element = '<h3>DVRs</h3>';
        element = element + '<div class="row">';

        for (var i = 0; i < dvr.length; i++) {

            if (i == 3) {
                element = element + '</div><div class="row">';
            }

            element = element + '<div class="col-md" id="element'+i+'">';
            element = element + lego.simpleItemDescriptor(dvr[i], "block");
            element = element + '</div>';

        };

        element = element + '</div>';
        element = element + '<hr>';

        $("#productos").append(element);
    } else {

        $("#productos").append("Imposible acceder al recurso. Causa: " + dvr["error"]["fetch"]);
    };
    //-----------------------------------------------------------------------------------------------------------
});
function loadProductCatalog (id, typeName) {

    $("#content").empty();

    user  = {
         operation : "fetch" 
     };

    datos =  { 
        tipo : "join", 
        tabla : "productos.id_caracteristicas, caracteristicas", 
        condicion : "productos.id_tipo = " + id, 
        apendice : "limit 0,9"
    };

    var productCatalog = lego.ajax("get", user, datos);
    
    if (!productCatalog["error"]) { 
        var element = '<h3>'+typeName+'</h3>';

        element = element + '<div class="row">';

        for (var i = 0; i < productCatalog.length; i++) {

            if (i == 3) {
                element = element + '</div><div class="row">';
            }

            element = element + '<div class="col-md" id="element'+i+'">';
            element = element + lego.simpleItemDescriptor(productCatalog[i], "block");
            element = element + '</div>';

        };

        element = element + '</div>';
        element = element + '<hr>';
        $("#content").append(element);

    } else {

        $("#content").append("No hay productos para mostrar. Mas informacion: " + productCatalog["error"]["fetch"]);
    }
};
//------------------------------------------------------------------------------------------------------------
function dashboard() {

    $("#content").empty();

    var cookie = Cookies.get();

    if(!$.isEmptyObject(cookie) && cookie["user"]) {

        $("#content").append(lego.userTool(Cookies.get('level'), ""));

        $("#content").append(lego.dashboardInfo("dashboard"));

    } else {

        $("#content").append(lego.loginForm());
    }
};
//------------------------------------------------------------------------------------------------------------
function login (userDiv, passwordDiv, levelDiv) { 

    user = {
            user     : $("#"+userDiv).val(),
            pass     : $("#"+passwordDiv).val(), 
            token    :  Cookies.get("token"), 
            level    : $("#"+levelDiv).val(), 
            operation: "login"
        }

    datos = {};

    login = lego.ajax("post", user, datos);


        if (!login["error"]) {
            Cookies.set("user",  login.user, {expires : 1});
            Cookies.set("token", login.token, {expires : 1});
            Cookies.set("level", login.level, {expires : 1});
            dashboard();
        } else {
            $("#productos").append("Imposible iniciar sesion. Causa: " + login["error"]["fetch"]);
        }

  };
//------------------------------------------------------------------------------------------------------------
function logout () {
    Cookies.remove("user");
    Cookies.remove("token");
    Cookies.remove("level");
    location.reload();
  
}



