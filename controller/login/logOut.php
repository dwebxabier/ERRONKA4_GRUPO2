<?php
header("Access-Control-Allow-Origin: *");
session_start();
session_destroy();

echo -1;