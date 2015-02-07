<?php
header('Content-Type: application/json');

usleep(2000000);
$rand = rand(1, 10);
$list = array();
while ($rand--) {
    $list[] = rand(0, 100) . 's';
}

echo json_encode($list, JSON_PRETTY_PRINT);
