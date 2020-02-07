<?php

namespace Drupal\show_projets\Controller;

use Drupal;
use Drupal\Core\Controller\ControllerBase;
use Drupal\session_handler\Actions\SessionVerify;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;


class ShowProjetsController extends ControllerBase
{

  private $sessionVerify;
  protected $http_kernel;
  public function __construct(SessionVerify $sessionVerifier, HttpKernelInterface $http_kernel )
  {
    $this->sessionVerify=$sessionVerifier;
    $this->http_kernel =$http_kernel;
  }

  public  function show()
  {
    $sessionCookie=Drupal::request()->query->get('session');
    if($sessionCookie&&$this->sessionVerify->isSessionValid($sessionCookie)) {
      $sub_request = Request::create('/jsonapi/node/eV7U65fYQPdgJrhZ/projet', 'GET');
      $subResponse = $this->http_kernel->handle($sub_request, HttpKernelInterface::SUB_REQUEST);
      $projets = $subResponse->getContent();

      return new Response($projets);
    }
    $error['message'] = "Session invalide";

    return new Response($error);

  }


  public static function create(ContainerInterface $container)
  {
    $sessionVerifier = $container->get('session_handler.verify_session');
    $kernel=$container->get('http_kernel');
    return new static($sessionVerifier, $kernel);
  }
}
