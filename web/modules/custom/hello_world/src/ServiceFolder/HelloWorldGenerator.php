<?php


namespace Drupal\hello_world\ServiceFolder;

  use Symfony\Component\HttpFoundation\Response;
class HelloWorldGenerator
{
  public function getTicket($count)
  {
    $buffer='';
    for ($i=0;$i<intval($count);$i++)
    {
      $buffer = $buffer.('Hello ! \n');
    }
    return $buffer;
  }

}
