var lego = {
  simpleItemDescriptor: function (data, mode) {

        //data contiene los datos necesarios para construir el descriptor de item. 
        //data, a modo de array, debe contener la url de la imagen, 

        //los indices del array corresponden a los de la tabla en la base de datos;

        //mode describe el modo de vista del constructor del item, BLOCK y LIST son las opciones

        var id              = data['id'];
        var url             = data["url"];
        var modelo          = data["modelo"];
        var caracteristicas = lego.scapeElements(data['caracteristicas']);
        var descripcion     = lego.scapeElements(data['descripcion']);

        var element         = '<div class="card mb-1 shadow-sm" >';
        element = element + "<input type='hidden' id ='"+id+"-caracteristicas' value='" + caracteristicas + "'>";
        element = element + "<input type='hidden' id ='"+id+"-descripcion' value='" + descripcion + "'>";
        element = element + "<input type='hidden' id ='"+id+"-url' value='" + url + "'>";
        element = element + "<input type='hidden' id ='"+id+"-modelo' value='" + modelo + "'>";


        switch (mode) {

          case "block" :
            element = element + '<img class="card-img-top"  src="' + url + '">';
            element = element + '<div class="card-body">';
            element = element + '<p class="card-text">' + descripcion + '</p>';
            element = element + '<div class="d-flex justify-content-between align-items-center">';
            element = element + '<div class="btn-group">';
            element = element + '<button type="button" class="btn btn-sm btn-outline-secondary"'; 
            element = element + 'onclick="lego.constructModal(';

            element = element + "'modal',";
            element = element + '\''+id+'\'';

            element = element + ');" data-toggle="modal" data-target="#itemModal"><span class="fas fa-search"></span></button>';
            element = element + '<button type="button" class="btn btn-sm btn-outline-secondary" onclick="lego.wish(\''+id+'\', \'1\')"><span class="fas fa-shopping-cart"></span></button>';
          break;

          case "list" :
           element = element + '<div class="card mb-1 shadow-sm">';
           element = element + '<div class="card-body">';
           element = element + '<div class="row">';
           element = element + '<div class="col-md-3">';
           element = element + '<img class="img-fluid img-thumbnail"  src="' + url + '">';
           element = element + '</div>';
           element = element + '<div class="col-md-9">';
           element = element + '<h5 class="card-title">' + modelo + '</h5>';
           element = element + ' <p class="card-text">' + descripcion + '</p>';
           element = element + '</div>';
          break;
        }

        element = element + '</div>';
        element = element + '</div>';
        element = element + '</div>';
        element = element + '</div>';

        return element;
  }, 

  kitSlideConstructor : function (data) {

        var element       = '<div id="kit" class="carousel slide shadow-sm border " data-ride="carousel">';
        element = element + '<ol class="carousel-indicators">';
        element = element + '<li data-target="#kit" data-slide-to="0" class="active"></li>';
        element = element + '<li data-target="#kit" data-slide-to="1"></li>';
        element = element + '<li data-target="#kit" data-slide-to="2"></li>';
        element = element + '</ol>';
        element = element + '<div class="carousel-inner">';

        var length = Object.keys(data);

        for (var i = 0; i < length.length; i++) {

          element = element + ' <div class="carousel-item crop-img';

          if (i == 0) {
            element = element + ' active">';
          } else {
            element = element + '">';
          }

          element = element + '   <img class="d-block w-100 img-fluid" src="' +data[i]['url']+ '" alt="kit 4ch 720p">';
          element = element + ' </div>'; //fin div item
          
        }
        
        element = element + '</div>';//div inner carousel

        element = element + '<a class="carousel-control-prev" href="#kit" role="button" data-slide="prev">';
        element = element + '<span class="carousel-control-prev-icon" aria-hidden="true"></span>';
        element = element + '</a>';
        element = element + '<a class="carousel-control-next" href="#kit" role="button" data-slide="next">';
        element = element + '<span class="carousel-control-next-icon" aria-hidden="true"></span>';
        element = element + '</a>';
        element = element + '</div>'; //div carousel

        return element;
  },

  navbar : function (data) {

    /* el array data contiene informacion para el navbar como por ejemplo los datos de inicio de sesion
    para personalizarlo en el elemento de Mis Compras*/
    
    var element       = '<nav class="navbar navbar-expand-lg navbar-light bg-light shadow fixed-top">';
    element = element + '<a class="navbar-brand" href="#">La Rocca One</a>';
    element = element + '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">';
    element = element + '<span class="navbar-toggler-icon"></span>';
    element = element + '</button>';

    element = element + '<div class="collapse navbar-collapse" id="navbarSupportedContent">';
    element = element + '<ul class="navbar-nav mr-auto">';
    element = element + '<li class="nav-item active">';
    element = element + '<a class="nav-link" href="index.php">Inicio</a>';
    element = element + '</li>';
    element = element + '<li class="nav-item">';
    element = element + '<a class="nav-link" href="#">Quienes Somos</a>';
    element = element + '</li>';
    element = element + '</li>';
    element = element + '<li class="nav-item">';
    element = element + '<a class="nav-link" href="#">Blog</a>';
    element = element + '</li>';
    element = element + '</ul>';
    element = element + '<div class="form-inline my-2 my-lg-0">';
    element = element + '<button class="btn btn-secondary" type="button" onclick="dashboard();">';

    if (Cookies.get("user") != undefined) {
      element = element + '<span class="fas fa-shopping-cart"></span> Mi Carrito';
    } else {
      element = element + '<span class="fas fa-sign-in-alt"></span> iniciar Sesion';
    }

    element = element + '</button>';    
    element = element + '</div>';
    element = element + '</div>';
    element = element + '</nav>';

    return element;
  },

  leftNav: function (data, funcion) {
    /* data es un array de indice numerico que contiene todas las opciones que el navbar izquierdo debe tener */
    
    var element       = '<ul class="list-group">';

    for (var i = 0; i < data.length; i++) {
      element = element + '  <li class="list-group-item"><a href="#" onclick="'+funcion+'('+data[i]["id"]+', \''+data[i]["tipo"]+ '\')">' +data[i]["tipo"]+ '</a></li>';
    }

    element = element + '</ul>';

    return element;
  },

  constructModal: function (div, id,) {


            var caracteristicas = $.parseJSON($("#"+id+"-caracteristicas").val());
            var descripcion     = $("#"+id+"-descripcion").val();
            var modelo          = $("#"+id+"-modelo").val();
            var url             = $("#"+id+"-url").val();

            index = Object.keys(caracteristicas[0]);

            var element       = '<div class="modal fade" id="itemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
            element = element + '<div class="modal-dialog" role="document">';
            element = element + '<div class="modal-content">';
            element = element + '<div class="modal-header">';
            element = element + '<h5 class="modal-title" id="exampleModalLabel">'+modelo+'</h5>';
            element = element + '<button type="button" class="close" data-dismiss="modal" onclick="lego.destroyModal(\'modal\');" aria-label="Close">';
            element = element + '<span aria-hidden="true">&times;</span>';
            element = element + '</button>';
            element = element + '</div>';
            element = element + '<div class="modal-body">';

            element = element + '<div class="row">';
            element = element + '<div class="col-md">';
            element = element + '<img src="'+url+'" class="img-thumbnail">';
            element = element + '</div>';
            element = element + '<div class="col-md">';
            element = element + '<p>';
            element = element + descripcion;
            element = element + '</p>';
            element = element + '</div>';
            element = element + '</div>';

            element = element + '<hr>';

            for (var i = 0; i < index.length; i++) {
              

                element = element + '<div class="row">';
                element = element + '<div class="col-md text-right">';
                element = element + '<div class="text-capitalize">'+index[i]+'</div>';
                element = element + '</div>';
                element = element + '<div class="col-md">';
                element = element + '<div class="text-capitalize">'+caracteristicas[0][index[i]]+'</div>';
                element = element + '</div>';
                element = element + '</div>';
          

            }

            $("#"+div).append(element);
            $("#itemModal").modal("show");
  },

  destroyModal: function (id) {
        $('#'+id).on('hidden.bs.modal', function () {
          $('#'+id).empty();
    });
  },

  footer : function() {
  },

  loading: function () {

    var element = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

    return element;
  },

  userTool: function (level, contentDiv) {

    var element       = '<nav class="navbar navbar-expand-lg navbar-light bg-light border border-secondary rounded-bottom">';

    element = element + '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#userToolItems" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">';
    element = element + '<span class="navbar-toggler-icon"></span>';
    element = element + '</button>';
    element = element + '<div class="collapse navbar-collapse" id="userToolItems">';
    element = element + '<ul class="navbar-nav mr-auto">';

    switch (level) {
      case "usuario":

        element = element + '<li class="nav-item">';
        element = element + '<a class="nav-link" onclick="lego.dashboardInfo(\'dashboard\');">Mis Datos</a>';
        element = element + '</li>';

        element = element + '<li class="nav-item">';
        element = element + '<a class="nav-link" onclick="lego.dashboardInfo(\'cotizacion\');">Mis Cotizaciones</a>';
        element = element + '</li>';

        element = element + '<li class="nav-item">';
        element = element + '<a class="nav-link" onclick="lego.dashboardInfo(\'deseo\');">Mis Deseos</a>';
        element = element + '</li>';

        element = element + '<li class="nav-item">';
        element = element + '<a class="nav-link" onclick="lego.dashboardInfo(\'compra\');">Mis Compras</a>';
        element = element + '</li>';

      break;

      case "vendedor":
      break;

      case "almacenista":
      break;

      case "tecnico":
      break;

      case "administrador":
      break;

      case "propietario":
      break;
    }

    element = element + '</ul>';
    element = element + '<div class="form-inline my-2 my-lg-0">';
    element = element + '<button class="btn " type="button" onclick="lego.logout();">';
    element = element + 'Salir <span class="fas fa-sign-out-alt"></span>';
    element = element + '</button>';    
    element = element + '</div>';
    element = element + '</div>';
    element = element + '</nav>';
    element = element + '<hr>';

    return element;
  },

  loginForm : function() {

        var element       = '<div class="jumbotron">';
        element = element + '<div class="form-group">';
        element = element + '<label for="user"><p class="">Nombre de Usuario</p></label>';
        element = element + '<input type="text" class="form-control" id="user" name="user" placeholder="Nombre de Usuario">';
        element = element + '</div>';
                        
        element = element + '<div class="form-group">';
        element = element + '<label for="pass"><p class="">Contraseña</p></label>';
        element = element + '<input type="password" class="form-control" id="pass" name="pass" placeholder="Contraseña">';
        element = element + '</div>';

        element = element + '<div class="form-group">';
        element = element + '<label for="level"><p class="">Categoria</p></label>';
        element = element + '<select class="form-control" id="level">';
        element = element + '<option value="usuario" selected>Usuario</option>';
        element = element + '<option value="vendedor">Vendedor</option>';
        element = element + '<option value="almacenista">Alacenista</option>';
        element = element + '<option value="tecnico">Tecnico</option>';
        element = element + '<option value="administrador">Administrador</option>';
        element = element + '</select>';
        element = element + '</div>';
                        
        element = element +  '<div class="text-right">';
        element = element +  '<input type="reset" class="btn btn-default" name="Borrar">';
        element = element +  '<input type="button" class="btn btn-primary" onclick="login(\'user\', \'pass\', \'level\')" name="Entrar" value="Iniciar Sesion">';
        element = element +  '</div>';
        element = element +  '</div>';

        return element;
  },

  wish : function(id, cant) {

    user = Cookies.get("user");

    if (user != undefined) {

      datos =  {
                  tipo     : "insert",
                  tabla    : "deseos",
                  datos    : "'','" + user + "', '" + id + "', '1'"

              };


      $.get("API/api.php", {

              datos : datos


          }, function (data) {

            lego.messageModal("Agregado con Exito", "El item ha sido agregado a su lista de deseos.");
              
      });

    } else {
      lego.messageModal("Debe Iniciar Sesion.", "Inicie sesion para agregar este producto a su lista de deseos.");
    }
  },

  messageModal : function (titulo, mensaje) {

    var element       = '<div class="modal fade" id="itemModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    element = element + '<div class="modal-dialog" role="document">';
    element = element + '<div class="modal-content">';
    element = element + '<div class="modal-header">';
    element = element + '<h5 class="modal-title" id="exampleModalLabel">'+ titulo +'</h5>';
    element = element + '<button type="button" class="close" data-dismiss="modal" onclick="lego.destroyModal(\'modal\');" aria-label="Close">';
    element = element + '<span aria-hidden="true">&times;</span>';
    element = element + '</button>';
    element = element + '</div>';
    element = element + '<div class="modal-body">';

    
    element = element + '<p>';
    element = element + mensaje;
    element = element + '</p>';
    element = element + '</div>';

    element = element + '</div>';
    element = element + '</div>';
    element = element + '</div>';

    $("#modal").append(element);
    $("#itemModal").modal("show") 
  },

  dashboardInfo : function(opcion) {

    $("#dashboard").remove();
    $("#content").append('<div id="dashboard"></div>');

    switch (opcion) {

      case "dashboard":
        var user = {
            user      : Cookies.get("user"),
            token     : Cookies.get("token"),
            level     : Cookies.get("level"),
            operation : "fetch"

          };

          var datos = {

            tipo     : "select",
            tabla    : "usuarios",
            condicion: "usuario = '" + Cookies.get("user") + "'"

          };

        var dashboard = lego.ajax("post", user, datos);

        dashboard = dashboard[0];

        var element       = '<div class="container border rounded">';

        element = element + '<div class="row">';
        element = element + '<div class="col-md"><span class="float-right">Nombre</span></div>';
        element = element + '<div class="col-md">'+dashboard.nombre+'</div>';
        element = element + '</div>';

        element = element + '<div class="row">';
        element = element + '<div class="col-md"><span class="float-right">Apellido</span></div>';
        element = element + '<div class="col-md">'+dashboard.apellido+'</div>';
        element = element + '</div>';

        element = element + '<div class="row">';
        element = element + '<div class="col-md"><span class="float-right">Fecha de Nacimiento</span></div>';
        element = element + '<div class="col-md">'+dashboard.fecha_nac+'</div>';
        element = element + '</div>';

        element = element + '<div class="row">';
        element = element + '<div class="col-md"><span class="float-right">Rol</span></div>';
        element = element + '<div class="col-md">'+dashboard.rol+'</div>';
        element = element + '</div>';

        element = element + '</div>';

        $("#dashboard").empty();

        $("#dashboard").append(element);
      break;

      case "cotizacion":

        //$("#dashboard").append(lego.cotizador());

        var user = Cookies.get("user");

        var datos = {
            tipo      : "join",
            tabla     : "deseos.id_producto, productos",
            condicion : "deseos.usuario = '" + user + "'" //usar el operador OR para generar la consulta solo de los itemes que esten en la lista de deseos

          };

        var cotizacion = lego.ajax("post", user, datos);

        if (!cotizacion["error"]) { 

          var element = '<div class="row"><div class="col-md-12">';

          for (var i = 0; i < cotizacion.length; i++) {
            
            element = element + lego.simpleItemDescriptor(cotizacion[i], "list"); 

          }

          element = element + '</div>';
          element = element + '</div>';
          $("#dashboard").append(element);
        } else {
          $("#dashboard").append("No hay datos para mostrar. Mas informacion: " + cotizacion["error"]["fetch"]);
        };
            
      break;

      case "deseo":
        var user = Cookies.get("user");
        var datos = {
            tipo      : "join",
            tabla     : "deseos.id_producto, productos",
            condicion : "deseos.usuario = '" + user + "'" //usar el operador OR para generar la consulta solo de los itemes que esten en la lista de deseos

          };

        var deseo = lego.ajax("post", user, datos);

        if (!deseo["error"]) { 

          var element = '<div class="row"><div class="col-md-12">';

          for (var i = 0; i < deseo.length; i++) {
            
            element = element + lego.simpleItemDescriptor(deseo[i], "list"); 

          }
          element = element + '</div>';
          element = element + '</div>';
          $("#dashboard").append(element);
        } else {
          $("#dashboard").append("No hay datos para mostrar. Mas informacion: " + deseo["error"]["fetch"]);
        }
      break;

      case "compra":
        var element       = '<div class="container border rounded" id="dashboard">';
        element = element + 'Compras';
        element = element + '</div>';
        $("#dashboard").append(element);
      break;

    }
  },

  scapeElements : function(element) {

    if (element != undefined) {

      element = element.replace(/&/g, "&amp;")
                       .replace(/</g, "&lt;")
                       .replace(/>/g, "&gt;")
                       .replace(/"/g, "&quot;")
                       .replace(/'/g, "&#039;");


    } else {

      element = null;
    }

    return element;
  },

  ajax : function (method, user, datos) {

    var ajax =  $.ajax({
                        // En data puedes utilizar un objeto JSON, un array o un query string
                      data: {datos: datos, user : user},
                        //Cambiar a type: POST si necesario
                      type: method,
                        // Formato de datos que se espera en la respuesta
                      dataType: "json",
                        // URL a la que se enviará la solicitud Ajax
                      url: "API/api.php",
                        // realizacion de peticion sincronica
                      async : false
                    });
    if (ajax.responseJSON) { 

      response = ajax.responseJSON;

    } else {
      response = {
        error : {
          fetch :  "CLIENT COMUNICATION PROBLEM OR BAD SENT/RECEIVED DATA."
        }
      };
    };

    return response;

  }

};

  


    
      
    
  
  
    
    
  
  
    
    





                  
                  
                    
                      
                      
                    
                    
                  
                
              
