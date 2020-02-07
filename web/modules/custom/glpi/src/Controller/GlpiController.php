<?php


namespace Drupal\glpi\Controller;


use Drupal;
use Drupal\Core\Controller\ControllerBase;
use Drupal\glpi\Services\GLPIConnect;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class GlpiController extends ControllerBase
{
  private $http_kernel;
  private $connexion;

  public function __construct(HttpKernelInterface $http_kernel, GLPIConnect $connect)
  {
    $this->http_kernel = $http_kernel;
    $this->connexion = $connect;

  }

  public static function create(ContainerInterface $container)
  {

    $kernel = $container->get('http_kernel');
    $connexion = $container->get('glpi_handler.glpi_login');
    return new static($kernel, $connexion);
  }

  public function handleConnexion()
  {
    $user = Drupal::request()->query->get('username');
    $password = Drupal::request()->query->get('password');
    if (isset($user) && isset($password)) {
      $base = base64_encode($user . ':' . $password);
      $token = '2tv7j7hy7dpwxlk9deg49hohsn3we8ictjjf8zy7';
      $loginRequest = $this->connexion->login($token, $base);
      $session_token = $loginRequest['session_token'];
      $killResult = $this->connexion->kill($token, $session_token);
      if (isset($session_token)) {
        $result['session_token'] = $session_token;
      } else {
        $result['login_error'] = "Connection failed";
      }
      if (isset($killResult)) {
        if ($killResult['status'] == 200) {
          $result['killStatus'] = "Session successfully killed with code" . $killResult['status'];
        } else {
          $result['killStatus'] = $killResult['message'];
        }
      }
      $resultJSON = json_encode($result);
      return new Response($resultJSON);
    } else {
      $type = \Drupal::request()->getContent();
      $responseObject = json_decode($type, true);
      $test["test"] = $responseObject['type'] . $responseObject['titre'];
      $response = json_encode($test);
      return new Response($response);

    }
  }
}
