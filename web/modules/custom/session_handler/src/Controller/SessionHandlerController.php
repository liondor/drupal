<?php


namespace Drupal\session_handler\Controller;
use Drupal;
use Drupal\Core\Controller\ControllerBase;
use Drupal\file\Entity\File;
use Drupal\node\Entity\Node;
use Drupal\session_handler\Actions\SessionOpen;
use Drupal\session_handler\Actions\SessionVerify;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class SessionHandlerController extends ControllerBase
{
  private $sessionOpen;
  private $sessionVerify;
  protected $http_kernel;
  public function __construct(SessionOpen $sessionOpener, SessionVerify $sessionVerifier, HttpKernelInterface $http_kernel )
  {
    $this->sessionOpen=$sessionOpener;
    $this->sessionVerify=$sessionVerifier;
    $this->http_kernel =$http_kernel;
  }
  public function handleSession()
  {
    $ticket=Drupal::request()->query->get('ticket');
    if($ticket) {
      $id = $this->sessionOpen->openSession($ticket);

      return new Response(json_encode($id));
    }
    return new Response(null);

  }


  public static function create(ContainerInterface $container)
  {
    $sessionOpener = $container->get('session_handler.open_session');
    $sessionVerifier = $container->get('session_handler.verify_session');
    $kernel=$container->get('http_kernel');
    return new static($sessionOpener , $sessionVerifier, $kernel);
  }
}
