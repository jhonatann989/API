<?php 
    
class db {
    

    protected $host = "localhost";
    protected $user = "tienda";
    protected $pass = "OAFTVtepikLzLQWn";
    protected $db   = "tienda";
            
    public $conexion = NULL;
            
    function __CONSTRUCT(){
        
        $this->conexion = mysqli_connect ($this->host, $this->user, $this->pass) or die(mysqli_error());
                        
        mysqli_select_db($this->conexion, $this->db) or die(mysqli_error($this->conexion)); 
        
    }
    
    function simpleFetch($sentencia){
        
        $i = 0;
        
        $query = mysqli_query($this->conexion, $sentencia);
        
        $resultado = NULL;
        
        if(is_object($query)){
            
            while($recorrido = mysqli_fetch_assoc($query)){
                $resultado[$i] = array_map('utf8_encode', $recorrido);
                $i++;
            }

                //se devuelven los resultados cuya sentencia SQL devuelva valores
            return $resultado;

        } elseif (mysqli_affected_rows($this->conexion) != -1) {

            //se devuelve TRUE para las sentencias SQL de insercion o actualizacion de datos
            return TRUE;

        } else {

            //se devuelve FLASE cuando no se pudo ejecutar la consulta SQL
            return FALSE;
             //mysqli_error($this->conexion);
        }
        
    }

    
    function simpleQuery ($array){


        $array["tipo"] = strtoupper($array["tipo"]);
        
        switch ($array["tipo"]){
            case "SELECT":
                    if($this->validateData($array)){
                        $query = "SELECT * FROM ". $array["tabla"] ." WHERE " . $array["condicion"]  . " ";

                        if (isset($array["apendice"])){

                            $query = $query . $array["apendice"];

                        }

                        return $this->simpleFetch($query);
                    } else {
                        return $var = [
                            "error" => [
                                "select" => "INCOMPLETE INFORMATION: ERROR ON TABLE, CONDITION OR FORMAT"
                            ]
                        ];
                    }
                BREAK;
            
			case "JOIN":
				if($this->validateData($array)){
                    
                        $query = ""; 
                        
                        str_replace ( " " , "", $array["tabla"]);
                        $explodeArray = explode ( "," , $array["tabla"]); //se separan los datos. en el caso 2, el array 0 contiene la tabla principal y en el caso 1, el array 0 y 1 contienen la tabla principal, que cuenta con las claves foraneas
                        
                        switch (count($explodeArray)) {
                            case "2":
                                
                                //$temp[0] contiene el nombre de la tabla principal
                                //$temp[1] contiene la clave foranea de la primera tabla secundaria
                                //$explodeArray[0] contiene la tabla 1 con la id foranea 1: tablaPrincipal.id_foranea1
                                //$explodeArray[1] contiene la tabla foranea 1
                                
                                $temp  = explode ( "." , $explodeArray[0]); 

                                $query = "SELECT * FROM " . $temp[0] . " INNER JOIN " . $explodeArray[1] . " ON " . $explodeArray[0] . " = " . $explodeArray[1] . ".id WHERE ".$array["condicion"]; 
                                
                                
                                                                    
                                return $this->simpleFetch($query);
                                                            
                                
                            BREAK;
                            
                            case "4":
                                //$temp[0][0] contiene el nombre de la tabla principal 
                                //$temp[0][1] contiene la clave foranea de la primera tabla secundaria 
                                //$temp[1][0] contiene el nombre de la tabla principal
                                //$temp[1][1] contiene la clave foranea de la segunda tabla secundaria 
                                //$explodeArray[0] contiene la tabla 1 con la id foranea 1: tablaPrincipal.id_foranea1
                                //$explodeArray[1] contiene la tabla 1 con la id foranea 2: tablaPrincipal.id_foranea2
                                //$explodeArray[2] contiene la tabla foranea 1
                                //$explodeArray[3] contiene la tabla foranea 2
                                
                                $temp[0] = explode ( "." , $explodeArray[0]);
                                $temp[1] = explode ( "." , $explodeArray[1]);
                                
                                
                                        
                                $query = "SELECT * FROM " . $temp[0][0] . " INNER JOIN " . $explodeArray[2] . " ON " . $explodeArray[0]. " = " . $explodeArray[2] . ".id"
                                                                        . " INNER JOIN " . $explodeArray[3] . " ON " . $explodeArray[1]. " = " . $explodeArray[3] . ".id  WHERE ".$array["condicion"];
                                                                        
    
                                
                                return $this->simpleFetch($query);
                            
                            BREAK;
                            
                            default:
                                $result = FALSE; 
                            BREAK;
                        }

                        return $this->simpleFetch($query);
                } else {

                        return $var = [
                            "error" => [
                                "join" => "INCOMPLETE INFORMATION: ERROR ON TABLE, CONDITION OR FORMAT"]
                            ];
                    }
				BREAK;
			
            case "INSERT":
                if($this->validateData($array)){
                        $query = "INSERT INTO ". $array["tabla"] ." VALUES (" . $array["datos"]  . ") " . " ";

                        if (isset($array["apendice"])){

                            $query = $query . $array["apendice"];

                        }

                        return $this->simpleFetch($query);
                    } else {
                        return $var = [
                            "error" => [
                                "insert" => "INCOMPLETE INFORMATION: ERROR ON TABLE, CONDITION OR FORMAT"
                                ]
                            ];
                    }
                BREAK;
            
            case "UPDATE":
                    if($this->validateData($array)){
                        $query = "UPDATE ". $array["tabla"] ." SET " . $array["datos"]  . " WHERE " . $array["condicion"]  . " ";

                        if (isset($array["apendice"])){

                            $query = $query . $array["apendice"];

                        }
                        

                        return $this->simpleFetch($query);
                    } else {
                        return $var = [
                                "error" => [
                                    "update" => "INCOMPLETE INFORMATION: ERROR ON TABLE, CONDITION OR FORMAT"
                                    ]
                            ];
                    }
                BREAK;
            
            case "DELETE":
                    if($this->validateData($array)){
                        $query = "DELETE FROM ". $array["tabla"] ." WHERE " . $array["condicion"]  . " ";
                        return $this->simpleFetch($query);
                    } else {
                        return $var = [
                                "error" => ["delete" => "INCOMPLETE INFORMATION: ERROR ON TABLE, CONDITION OR FORMAT"
                                ]
                            ];
                    }
                BREAK;
            
            default:
                return $var = [
                            "error" => [
                                "tipo" => "OPERATION NOT RECOGNIZED OR NOT SUPPORTED"
                                ]
                            ];
                BREAK;
            
        }
        
    }

    //la funcion validateData se asegura de que los datos suministrados cumplan con los requerimientos del constructor de consultas
    function validateData ($array) {

         //el tipo de consulta pueden/deben ser select, insert, update y delete

        switch ($array["tipo"]) {

             //SELECT se selecciona la tabla con la que se realiza la consulta y su condicion. Si no hay condicion, el indice CONDICION debe contener el valor 1
            case "SELECT":

                if (isset($array["tabla"]) && isset($array["condicion"])) {

                    return TRUE;

                } else {

                    return FALSE;
                }

                BREAK;
			
			 //JOIN selecciona las tablas con las que se realizará una consulta usando el operador INNER JOIN. 
             //el indice TABLA, debe contener un string de 2 tablas separadas por coma, la primera acompañada de la ID que apunta la clave foranea y la segunda solo el nombre de la tabla
             //$array["tabla"] = "tablaOrigen.id_foranea, tablaForanea"
             
             //Si se realizara el inner join en 3 tablas, la tabla primaria que contiene las claves foraneas, debe escribirse 2 veces: la primera acompañada de la  primera clave foranea y la segunda vez con la 
             //segunda clave foranea, separadas en cada caso por un punto segun el ejemplo en la linea siguiente: 
             // $array["tabla"] = "tablaOrigen.id_foranea1, tablaOrigen.id_foranea2,  tablaForanea1, tablaforanea2"
            case "JOIN": 
            
                
                if (isset($array["tabla"]) && isset($array["condicion"])) {
                    
                    str_replace ( " " , "", $array["tabla"]);
                    $explodeArray = explode ( "," , $array["tabla"]);                    
                                        
                    switch (count($explodeArray)) {
                        case "2":
                            
                            $temp = explode ( "." , $explodeArray[0]);
                                if (is_array($temp)) {
                                    
                                    $result = TRUE; 

                                } else {

                                    $result = FALSE; 

                                }
                        BREAK;
                        
                        case "4":
                            $temp[0] = explode ( "." , $explodeArray[0]);
                            $temp[1] = explode ( "." , $explodeArray[1]);
                            
                            
                                if (is_array($temp[0]) && is_array($temp[1])) {
                                    
                                    $result = TRUE; 

                                } else {

                                    $result = FALSE; 

                                }
                        BREAK;
                        
                        default:
                        
                            $result = FALSE; 
                        BREAK;
                    }
                    
                    return $result;
                }

            
            BREAK;

            case "INSERT":

                //INSERT los datos a insertar, deben estar concatenados, resultando en un array con los datos separados por comas y entre comillas simples, y en el mismo orden de las columnas de la tabla seleccionada
                //ej: 'dato1', 'dato2', 'dato3',.....

                if (isset($array["tabla"]) && isset($array["datos"])) {

                    $array["datos"] = str_replace ( " " , "", $array["datos"]);

                    $explodeArray = explode ( "," , $array["datos"]);

                    foreach ($explodeArray as $string) {

                        if ($string[0] == "'" && $string[strlen($string) -1] == "'") {

                            $result = TRUE; 

                        } else {

                            $result = FALSE; 

                            BREAK;
                        }
                    }

                    return $result;

                } else {

                    return FALSE;

                }
                BREAK;

            case "UPDATE":
                 //UPDATE los datos a actualizar, deben estar concatenados en el formato columna='dato', resultando en un array con los datos separados por comas

                if (isset($array["tabla"]) && isset($array["datos"]) && isset($array["condicion"])){

                    str_replace ( " " , "", $array["datos"]);
                    $explodeArray = explode ( "," , $array["datos"]);

                    foreach ($explodeArray as $string) {

                        $dato = explode ( "=" , $string);

                        if ($dato[1][1] == "'" && $dato[1][strlen($dato[1]) - 1] == "'") {

                            $result = TRUE; 

                        } else {

                            $result = FALSE; 

                            BREAK;
                        }

                        return $result;
                    }
                } else {

                    return FALSE;
                }
                    
                BREAK;

            case "DELETE":

                //DELETE los datos a borrar DEBEN ser acompañados de la condicion, para evitar perdida de datos en tablas de la base de datos, la condicion NUNCA puede ser 1
                if (isset($array["tabla"]) && isset($array["condicion"]) && $array["condicion"] != 1) {

                    return TRUE;

                } else {

                    return FALSE;
                }

                BREAK;

        }

    }
    
}
    

?>