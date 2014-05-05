<?php
/**
 * Ideal CMS (http://idealcms.ru/)
 * @link      http://github.com/ideals/idealcms репозиторий исходного кода
 * @copyright Copyright (c) 2012-2014 Ideal CMS (http://idealcms.ru)
 * @license   http://idealcms.ru/license.html LGPL v3
 */
$rand = rand(1, 10);
$list = array();
while ($rand--) {
    $list[$rand] = rand(0, 100);
}
echo json_encode($list);
