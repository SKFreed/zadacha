<?php
//read json file
//echo '<pre>'; //выводит в том форматировании, в котором есть наш файл
$data = file_get_contents("data.json"); // команда для чтения файла , в ней указывается путь к файлу,а не название файла
//print_r($data) ;
//echo "<br>";
//$res = json_decode($data, true); // содержимое json  файла в вие массива
//var_dump($res);

/*for ($i = 0; $i < count($res); $i++) // пример работы с данными в массиве, добавляет aad каждой строке ART
{
    $res[$i]['ART'] = $res[$i]['ART'] .'aad';
}*/
//print_r($res);

//write json
//присвоение json массива в строку
//$jsonRes = json_encode($res);
echo $data;
//file_put_contents('t.json', $jsonRes);// создание файла t.json  запись в него массива , закодированного в строку