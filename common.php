<?php

function getVar($name, $method) {
	$unparsed = "";
	switch ($method) {
		case "GET":
			$unparsed = $_GET[$name];
			break;
		case "POST":
			$unparsed = $_POST[$name];
			break;
		default:
			$unparsed = $_GET[$name];
			break;
	}
	
	$unparsed = strip_tags($unparsed);
	$unparsed = html_entity_decode($unparsed);
	
	return $unparsed;
}

?>