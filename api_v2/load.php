<?php

error_reporting(0);
include_once('config.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

$pech = $_GET['pech'];
$date = $_GET['date'];

$date = str_replace('-', '', $date);

$url = $url . $pech . '/' . $date . '/';
//$url = 'http://emmielba.ddns.net/api_v2/testpage1/';
$link = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
$link = stristr($link, 'load.php', true);
$frameUrl = $link . 'frame.php';
 
if (file_get_contents($url)) {
    echo json_encode([
            'status' => true,
            'frameUrl' => $frameUrl,
            'dataTerm' => [
                [
                    'name' => '1',
                    'url' => $url . $file1,
                    'urlZoom' => $url . $fileZoom1,
                ],
                [
                    'name' => '2',
                    'url' => $url . $file2,
                    'urlZoom' => $url . $fileZoom2,
                ],
                [
                    'name' => '',
                    'url' => $url . $file3,
                    'urlZoom' => $url . $fileZoom3,
                ],
                [
                    'name' => '4',
                    'url' => $url . $file4,
                    'urlZoom' => $url . $fileZoom4,
                ]
            ]
        ], JSON_UNESCAPED_SLASHES);
} else {
    echo json_encode(['status' => false, 'dateTerm' => []]);
}