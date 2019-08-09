<?php

error_reporting(0);
include_once('config.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

$pech = $_GET['pech'];
$date = $_GET['date'];
$termopara = $_GET['termopara'];
$zoom = $_GET['zoom'];

if ($zoom == false) {
    switch ($termopara) {
        case '1': $link = $url . $pech . '/' . $date . '/' . $file1;
            break;
        case '2': $link = $url . $pech . '/' . $date . '/' . $file2;
            break;
        case '3': $link = $url . $pech . '/' . $date . '/' . $file3;
            break;
        case '4': $link = $url . $pech . '/' . $date . '/' . $file4;
            break;
    }
} else {
    switch ($termopara) {
        case '1': $link = $url . $pech . '/' . $date . '/' . $fileZoom1;
            break;
        case '2': $link = $url . $pech . '/' . $date . '/' . $fileZoom2;
            break;
        case '3': $link = $url . $pech . '/' . $date . '/' . $fileZoom3;
            break;
        case '4': $link = $url . $pech . '/' . $date . '/' . $fileZoom4;
            break;
    }
}
echo file_get_contents($link);