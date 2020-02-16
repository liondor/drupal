<?php

namespace Drupal\hello_world\Controller;

use Drupal;
use Drupal\Core\Controller\ControllerBase;
use Drupal\file\Entity\File;
use Drupal\hello_world\ServiceFolder\HelloWorldGenerator;
use Drupal\node\Entity\Node;
use Drupal\session_handler\Actions\SessionVerify;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;

class HelloWorldController extends ControllerBase
{
  private $helloGenerator;
  private $sessionVerify;

  public function __construct(HelloWorldGenerator $helloWorldGenerator, SessionVerify $sessionVerify)
  {
    $this->helloGenerator=$helloWorldGenerator;
    $this->sessionVerify = $sessionVerify;
  }

  public function sayHello()
  {/*
    $ticket=Drupal::request()->query->get('ticket');
    $sessionCookie=Drupal::request()->query->get('session');
    if($sessionCookie && $sessionCookie)
    if($ticket)
    {
      $url='https://auth.martinique.univ-ag.fr/cas/serviceValidate?service=http://127.0.0.1:8900/dsin/web/hello&ticket='.$ticket;
      $xml = file_get_contents($url);
      //  echo $xml;
        if(strpos($xml,'cas:authenticationSuccess'))
        {
          echo 'Yatta ! Banzai !';
          $node = Node::create([
            'type' => 'session',
            'title' =>  substr(md5(rand()), 0, 16)
          ]);
          $node->save();
        }
       elseif (strpos($xml,'cas:authenticationFailure'))
      {
        $id=substr(md5(rand()), 0, 16);
      //  echo 'Sudoku ! Seppuku !';
        $node = Node::create([
          'type' => 'session',
          'title' =>  $id
        ]);
        $node->save();
        return new Response("JSESSION=".$id.";");
      }
        else{
          echo 'Something went horribly wrong';
        }

    }else
    {

    }

  $test = $this->helloGenerator->getTicket(5);*/


    return new Response("Yes");
  }

  public static function create(ContainerInterface $container)
  {
    $helloGen = $container->get('hello_world.hello_world_generator');
    $sessionVerifier = $container->get('session_handler.verify_session');
    return new static($helloGen, $sessionVerifier);
  }
}

?>
