<?php

require_once("common.php");

$action = getVar("action", "POST");

$playerID = getVar("playerID", "POST");
$gameID = getVar("gameID", "POST");

switch ($action) {
case "whoStarts":
	if ($playerID == 0) {
		echo("true");
	} else if ($playerID == 1) {
		echo("false");
	}
	break;
}

?>