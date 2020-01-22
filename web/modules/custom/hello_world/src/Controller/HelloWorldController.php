<?php

namespace Drupal\hello_world\Controller;

use Symfony\Component\HttpFoundation\Response;

class HelloWorldController{
  public function sayHello($ticket, $id)
  {
    return new Response('Hello, your ticket is :'.$ticket.' and your id is : '.$id);
  }
}

?>
