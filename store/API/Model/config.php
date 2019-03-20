<?php






/*
	CONSTANTES DE NIVEL DE ACCESO

	se define una constante de nivel de acceso para saber el grado de accesibilidad de la base de datos segun el nivel del usuario. Existen definidos 6 niveles de acceso, no necesariamente jerarquicos pero con particular grado de alcance:
		- invitado
		- usuario
		- vendedor
		- almacenista
		- tecnico
		- administrador
		- propietario
*/


define('USUARIO', [
	"cables"           => "cables", 
	"camaras"          => "camaras", 
	"cctv_vr"          => "cctv_vr", 
	"conectores"       => "conectores", 
	"fuentes"          => "fuentes", 
	"kits"             => "kits", 
	"marcas"           => "marcas",
	"productos"        => "productos",
	"caracteristicas"  => "caracteristicas", 
	"tipo"             => "tipo",
	"usuarios"         => "usuarios",
	"deseos"           => "deseos"
]);

define('VENDEDOR', [
	"cables"           => "cables", 
	"camaras"          => "camaras", 
	"cctv_vr"          => "cctv_vr", 
	"conectores"       => "conectores", 
	"fuentes"          => "fuentes", 
	"kits"             => "kits", 
	"marcas"           => "marcas", 
	"tipo"             => "tipo", 
	"productos"        => "productos",
	"caracteristicas"  => "caracteristicas",
	"usuarios"         => "usuarios"
]);

define('ADMINISTRADOR', [
	"cables"           => "cables", 
	"camaras"          => "camaras", 
	"cctv_vr"          => "cctv_vr", 
	"conectores"       => "conectores", 
	"fuentes"          => "fuentes", 
	"kits"             => "kits", 
	"marcas"           => "marcas", 
	"tipo"             => "tipo", 
	"productos"        => "productos",
	"caracteristicas"  => "caracteristicas",
	"usuarios"         => "usuarios"
]);

define('PROPIETARIO', [
	"cables"           => "cables", 
	"camaras"          => "camaras", 
	"cctv_vr"          => "cctv_vr", 
	"conectores"       => "conectores", 
	"fuentes"          => "fuentes", 
	"kits"             => "kits", 
	"marcas"           => "marcas", 
	"tipo"             => "tipo", 
	"productos"        => "productos",
	"caracteristicas"  => "caracteristicas",
	"usuarios"         => "usuarios"
]);

define('ALMACENISTA', [
	"cables"           => "cables", 
	"camaras"          => "camaras", 
	"cctv_vr"          => "cctv_vr", 
	"conectores"       => "conectores", 
	"fuentes"          => "fuentes", 
	"kits"             => "kits", 
	"marcas"           => "marcas", 
	"productos"        => "productos",
	"caracteristicas"  => "caracteristicas",
	"tipo"             => "tipo"
]);

define('TECNICO', [
	"cables"           => "cables", 
	"camaras"          => "camaras", 
	"cctv_vr"          => "cctv_vr", 
	"conectores"       => "conectores", 
	"fuentes"          => "fuentes", 
	"kits"             => "kits", 
	"marcas"           => "marcas", 
	"productos"        => "productos",
	"caracteristicas"  => "caracteristicas",
	"tipo"             => "tipo"
]);

?>