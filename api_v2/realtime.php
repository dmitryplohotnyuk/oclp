<?php
error_reporting(0);
include_once('config.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true ");
header("Access-Control-Allow-Methods: OPTIONS, GET, POST");
header("Access-Control-Allow-Headers: Content-Type, Depth, User-Agent, X-File-Size, X-Requested-With, If-Modified-Since, X-File-Name, Cache-Control");

$pech = $_GET['pech'];
$termopara = $_GET['termopara'];
$zoom = $_GET['zoom'];
$task = $_GET['task'];

$frameUrl = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

if ($task == 'terms') {
    $result = ['terms' => [
                            [
                                'text' => 'Термопечь №7',
                                'value' => 7
                            ],
                            [
                                'text' => 'Термопечь №9',
                                'value' => 9
                            ],
                            [
                                'text' => 'Термопечь №10',
                                'value' => 10
                            ]
                        ], 
                'frameUrl' => $frameUrl,
                'data' => [
                    [
                        'name' => '1',
                    ],
                    [
                        'name' => '2',
                    ],
                    [
                        'name' => '3',
                    ],
                    [
                        'name' => '4',
                    ]
                ]
    ];

    echo json_encode($result, JSON_UNESCAPED_UNICODE);
}

if ($task == 'data') {
    if ($zoom == 'false') {
        switch ($termopara) {
            case '1': $link = $url . 'now/' . $pech . '/zona_1.svg';
                break;
            case '2': $link = $url . 'now/' . $pech . '/zona_2.svg';
                break;
            case '3': $link = $url . 'now/' . $pech . '/zona_3.svg';
                break;
            case '4': $link = $url . 'now/' . $pech . '/zona_4.svg';
                break;
        }
    } else {
        switch ($termopara) {
            case '1': $link = $url . 'now/' . $pech . '/zoom_1.svg';
                break;
            case '2': $link = $url . 'now/' . $pech . '/zoom_2.svg';
                break;
            case '3': $link = $url . 'now/' . $pech . '/zoom_3.svg';
                break;
            case '4': $link = $url . 'now/' . $pech . '/zoom_4.svg';
                break;
        }
    }
    echo '<META HTTP-EQUIV="REFRESH" CONTENT="60">';
    echo file_get_contents($link);
}