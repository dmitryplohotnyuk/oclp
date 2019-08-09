<?php
error_reporting(0);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

$pech = $_GET['pech'];
$date = $_GET['date'];

//$url = "http://192.168.9.3/oclp/$pech/$date/";
$url = 'http://localhost/api_v2/testpage2/';

if (file_get_contents($url)) {
    echo json_encode([
            'status' => true,
            'dataTerm' => [
                [
                    'name' => '1',
                    'url' => $url . 'file1.svg',
                    'urlZoom' => $url . 'zoom1.svg',
                ],
                [
                    'name' => '2',
                    'url' => $url . 'file2.svg',
                    'urlZoom' => $url . 'zoom2.svg',
                ],
                [
                    'name' => '',
                    'url' => $url . 'file3.svg',
                    'urlZoom' => $url . 'zoom3.svg',
                ],
                [
                    'name' => '4',
                    'url' => $url . 'file4.svg',
                    'urlZoom' => $url . 'zoom4.svg',
                ]
            ]
        ], JSON_UNESCAPED_SLASHES);
} else {
    echo json_encode(['status' => false, 'dateTerm' => []]);
}