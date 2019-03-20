<?php

class auth {

	protected $token = NULL;

	protected $data = NULL;

	function __CONSTRUCT ($user, $token) {

		$this->data = [ 
			"tipo" => "select",
			"tabla" => "usuarios",
			"condicion" => "usuario = '$user' AND token = '$token'"

		];

	}


	function firstAuth(db $db, $user, $pass, $level) {

		$this->data ["condicion"] = "usuario = '$user' AND password = '$pass' AND rol = '$level'";
		
		$auth = $db->simpleQuery($this->data); 

		$return = FALSE;

		if (is_array($auth)) {

			$token = $this->generateToken();

			$this->data ["tipo"]      = "update";
			$this->data ["datos"]     = "token = '$token', updated_at = '". time(). "'";
			$this->data ["condicion"] = "usuario = '$user' AND password = '$pass'";

			

			if ($db->simpleQuery($this->data)) {

				$return = [
					"user" => "$user",
					"level" => "$level",
					"token" => "$token"
				];				
			}


		} else {

			$return = FALSE;
		}

		return $return;
	}

	function auth (db $db, $token) {


		$pre_auth = $db->simpleQuery($this->data);

		if (is_array($pre_auth)) {

			$auth = $this->validateToken($pre_auth);

			if ($auth) {

				//devuelve TRUE si la autenticacion del usuario y la validacion del TOKEN fueron correctas
				return TRUE;

			} else {

			// la verificacion del token falló pero el usuario es valido

				return FALSE;
			}
		}
	}
	
	function generateToken () {

		$endDate   = time() + 86400;
		$ip = $_SERVER['REMOTE_ADDR'];

		$pre_token =$endDate . $ip;
		$token = bin2hex($pre_token);

		return $token;

	}

	function validateToken ($user) {

		$updated_at = $user[0]['updated_at'];

		$endDate   = $updated_at + 86400;
		$ip        = $_SERVER['REMOTE_ADDR'];

		$validatetoken = $endDate . $ip;

		if ($endDate >= time() && $validatetoken == hex2bin($user[0]["token"])) {


			//se devuelve TRUE si el usuario tiene un token valido y vigente
			return TRUE;


		} else {

			//se devuelve FALSE si el usuario tiene un token invalido o vencido
			echo "Token Validation Failed. ";
			return FALSE;
		}


	}

	function validateUserLevel ($tabla, $level) {

		$validate = NULL;

		switch ($level){
			case "usuario":

				if(array_key_exists($tabla, USUARIO)) {

					$validate = TRUE;
				} else {
					$validate = FALSE;
				}

			break; 

			case "vendedor":

				if(array_key_exists($tabla, VENDEDOR)) {

					$validate = TRUE;
				} else {
					$validate = FALSE;
				}

			break; 

			case "administrador":

				if(array_key_exists($tabla, ADMINISTRADOR)) {

					$validate = TRUE;
				} else {
					$validate = FALSE;
				}

			break; 

			case "propietario":

				if(array_key_exists($tabla, PROPIETARIO)) {

					$validate = TRUE;
				} else {
					$validate = FALSE;
				}

			break;

			case "almacenista":

				if(array_key_exists($tabla, ALMACENISTA)) {

					$validate = TRUE;
				} else {
					$validate = FALSE;
				}

			break; 

			case "tecnico":

				if(array_key_exists($tabla, TECNICO)) {

					$validate = TRUE;
				} else {
					$validate = FALSE;
				}

			break; 

			default: $validate = FALSE;
		}


		return $validate;

	}
}

?>