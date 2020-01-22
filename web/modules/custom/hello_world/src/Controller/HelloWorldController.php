<?php

namespace Drupal\hello_world\Controller;

use Symfony\Component\HttpFoundation\Response;

class HelloWorldController{
  public function sayHello($ticket)
  {
//The URL with parameters / query string.
$url = 'http://google.com/search?q='.$ticket;

//Once again, we use file_get_contents to GET the URL in question.
$contents = file_get_contents($url);

//If $contents is not a boolean FALSE value.
if($contents !== false){
  //Print out the contents.
  echo $contents;
}
    return new Response('Hello, your ticket is :'.$contents);
  }
}

?>
