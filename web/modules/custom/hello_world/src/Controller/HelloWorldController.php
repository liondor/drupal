<?php

namespace Drupal\hello_world\Controller;

use Symfony\Component\HttpFoundation\Response;

class HelloWorldController{
  public function sayHello($ticket)
  {
    return new Response('Hello, your ticket is'+$ticket);
  }
}

?>
