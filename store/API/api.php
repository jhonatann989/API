<?php

require("Model/config.php");

/*

	Esta API gestiona autenticacion de usuarios, consultas, insersion y actualizacion de datos en 
	una base de datos. 

	Se requiere el envio de informacion en 2 variables fundamentales. La primera de ellas es un string
	con un token generado en la autenticacion, y la segunda es un array con los datos a manipular segun
	lo establecido en db.class.php

*/


require("Model/db.class.php");
require("Model/auth.class.php");


//      $array[user, pass, token, level, operation] 

//nombre del usuario con la sesion iniciada o por iniciar sesion, su contraseña, su token si lo hubiera y su nivel de acceso.

//por defecto fetch acepta del cliente las palabras FETCH y LOGIN. La primera para recuperar informacion de la base de datos, y la segunda, para autenticarse. el parametro LOGIN solo debe ser evocado por el controlador que gestiona la autenticacion.

$user = NULL;

//debe almacenar los datos enviados en la peticion GET o POST para la operacion requerida. Los datos a enviar son en un array con los indices TIPO, TABLA, DATOS, CONDICION y APENDICE.
//Los DATOS, segun la documentacion de db.class.php deben ser separados por comas y entre comillas simples, y en el mismo orden de las columnas de la tabla seleccionada y los de DATOS destinados a consultas UPDATE deben estar concatenados en el formato columna='dato', resultando en un array con los datos separados por comas
$datos     = NULL;



//-----> $operation = "fetch";


$db = new db;


switch ($_SERVER['REQUEST_METHOD']) {

	case "GET":

		if (isset($_GET['datos'])) {

			$datos = $_GET['datos'];

		}

		$auth = new auth("","");

        if ($datos["tipo"] == "join") {

			str_replace ( " " , "", $datos["tabla"]);
        	$explodeArray = explode ( "." , $datos["tabla"]);
        	$level = $explodeArray[0];

        } else {

        	$level = $datos["tabla"];
        }



		if($auth->validateUserLevel($level, "usuario")) {

				if ($resultado = $db->simpleQuery($datos)) {

					echo json_encode($resultado);

				} else {

					$answer = [
						"error" => [
							"fetch" => "ERROR RETRIEVING INFORMATION"
						]
					]; 

					echo json_encode($answer);

				}
		} else {     

			$answer = [
				"error" => [
					"fetch" => "INCOHERENT USER LEVEL WHILE ACCESING"
				]
			]; 

			echo json_encode($answer);

		}
	BREAK;

	case "POST":

		if (isset($_POST['user'])) {

			$user = $_POST['user'];
		}

		if (isset($_POST['datos'])) {

			$datos = $_POST['datos'];

		}
		

		if ($user['operation'] == "fetch") {

			if (isset($user['user']) && isset($user['token']) && isset($user['level'])){

				$auth = new auth($user['user'], $user['token']);



				if($auth->auth($db, $user['token']) && $auth->validateUserLevel($datos["tabla"], $user['level'])) {

						if ($resultado = $db->simpleQuery($datos)) {


							if ($datos["tabla"] == "usuarios") {

								$resultado[0]["password"] = "";

							}

							echo json_encode($resultado);
							//echo json_last_error();
							//var_dump($resultado);


						} else {

							$answer = [
								"error" => [
									"fetch" => "ERROR RETRIEVING INFORMATION"
								]
							]; 
							echo json_encode($answer);

						}

						//echo json_encode($db->simpleQuery($datos));

					} else {
						//echo mysqli_error($db->conexion);

						$answer = [
								"error" => [
									"fetch" => "UNAUTHORIZED. INCORRECT USER LEVEL OR INVALID-EXPIRED TOKEN"
								]
							]; 
						echo json_encode($answer);

					}

			} else {

				$answer = [
						"error" => [
							"fetch" => "UNAUTHORIZED. EXPIRED LOGIN OR INCOHERENT USER LEVEL"
						]
					]; 
				echo json_encode($answer);
			}

		} elseif ($user['operation'] == "login") {

			$auth = new auth($user['user'], "");

			if ($result = $auth->firstAuth($db, $user['user'], $user['pass'], $user['level']) ) {

				unset($user);

				echo json_encode($result);

			} else {
				//echo mysqli_error($db->conexion);
				//http_response_code(401); //No Autorizado
				$answer  = [
						"error" => [
							"login" => "UNAUTHORIZED, USER OR PASSWORD WERE INCORRECT OR LEVEL IS INCOHERENT"
					]
				]; 
				echo json_encode($answer);
			}

		}

	BREAK;

	default: 
		$answer["API"] = "METHOD NOT ALLOWED"; 
		echo json_encode($answer); //Metodo no permitido
	BREAK;
}




?>
