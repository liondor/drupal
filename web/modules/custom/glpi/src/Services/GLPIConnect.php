<?php

namespace Drupal\glpi\Services;

use Symfony\Component\HttpClient\HttpClient;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\HttpKernelInterface;

class GLPIConnect
{
  private $http_kernel;

  public function __construct(HttpKernelInterface $http_kernel)
  {
    $this->http_kernel = $http_kernel;
  }

  public function login($app_token, $loginInfo64)
  {
    //$request = Request::create('http://coulirou.univ-antilles.fr/apirest.php/initSession/', 'GET');

    $client = HttpClient::create(['headers' => [
      'Content-Type' => 'application/json',
      'Authorization' => 'Basic ' . $loginInfo64,
      'App-Token' => $app_token,
    ]]);
    $response = $client->request('GET', 'http://localhost:80/glpi/apirest.php/initSession/');
    // $response=$client->request('GET','https://jsonplaceholder.typicode.com/todos/1');
    return $response->toArray(false);
  }

  public function kill($appToken, $sessionToken)
  {

    $client = HttpClient::create(['headers' => [
      'Content-Type' => 'application/json',
      'Session-Token' => $sessionToken,
      'App-Token' => $appToken,
    ]]);
    $response = $client->request('GET', 'http://localhost:80/glpi/apirest.php/killSession/');
    $statusCode = $response->getStatusCode();
    if ($statusCode == 200) {
      $result['status'] = $statusCode;
      return $result;
    } else {
      $result['status'] = $statusCode;
      $result['message'] = $response->toArray(false)['message'];
      return $result;
    }
  }


}
