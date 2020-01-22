<?php

namespace Drupal\hello_world\Controller;

use Symfony\Component\HttpFoundation\Response;

class HelloWorldController{
  public function sayHello()
  {
    return new Response('Hello');
  }
}

?>
