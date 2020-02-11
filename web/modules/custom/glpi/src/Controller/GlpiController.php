<?php


namespace Drupal\glpi\Controller;


use Drupal;
use Drupal\Core\Controller\ControllerBase;
use Drupal\glpi\Services\GLPIConnect;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpClient\HttpClient;
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
    $categorie = Drupal::request()->query->get('categorie');
    $session_token = Drupal::request()->query->get('sessionToken');
    $token = 'Hr9vwPbFZRlRtUJ5nUVKIxWPDUWscv6p0Bbt0wxb';
    $URL_GLPI = 'http://localhost:80/glpi/apirest.php/';

    $client = HttpClient::create(['headers' => [
      'Content-Type' => 'application/json',
      'Session-Token' => $session_token,
      'App-Token' => $token,
    ]]);

    if (isset($user) && isset($password)) {
      $base = base64_encode($user . ':' . $password);
      $loginRequest = $this->connexion->login($token, $base);
      $session_token = $loginRequest['session_token'];
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
    } elseif (isset($categorie) && isset($session_token)) {
      $response = $client->request('GET', $URL_GLPI . 'ITILCategory/');
      $resultCategory = $response->getContent(false);
      if ($response->getStatusCode() == 200) {
        //Récupération des noms des catégories
        $resultCategoryDecoded = json_decode($resultCategory, true);
        $filteredResults = array_filter($resultCategoryDecoded, function ($obj) {
          return $obj["is_incident"];
        });
        $filteredResults = array_values($filteredResults);
        for ($i = 0; $i < count($filteredResults); $i++) {
          $resultCategoryNames[$filteredResults[$i]["id"]]["name"] = $filteredResults[$i]["completename"];
          $resultCategoryNames[$filteredResults[$i]["id"]]["id"] = $filteredResults[$i]["id"];
          $resultCategoryNames[$filteredResults[$i]["id"]]["category"] = $filteredResults[$i]["itilcategories_id"];

        }

        return new Response(json_encode($resultCategoryNames));
      } else {
        return new Response($resultCategory);

      }
    } elseif (isset($session_token)) {
      /* || Test pour l'acquisition et la manipulation des données du formulaire
          $type = \Drupal::request()->getContent();
          $responseObject = json_decode($type, true);
          $test["test"] = $responseObject['type'] . $responseObject['titre'];

          /* || Test pour déterminer le format à suivre pour créer un ticket
      $mockFormArray["name"] = "Ticket créé depuis Drupal avec du contenu cette fois ci";
      $mockFormArray["content"] = "Contenu créé depuis Drupal";
      //TODO:Mettre en place une vérification du contenu du formulaire du client
      $mockFormArray["itilcategories_id"] = 5;
      /*On ajoute un champs invalide pour voir
  // $mockFormArray["nme"] = "Champ invalide";
      Il semblerait qu'au lieu de rejeter la requête entièrement, le glpi récupère uniquement les
      champs valide et crée un ticket avec ceux-ci. Intéressant.
     */
      /*
            $jsonArray["input"] =$mockFormArray;
           $input= json_encode($jsonArray);
           $response = $client->request('POST', 'http://localhost:80/glpi/apirest.php/Ticket/',[
             'body' => $input]);
          //echo $response->getContent(false);
        */

      /* || Test pour la récupération des catégories
      $response = $client->request('GET', 'http://localhost:80/glpi/apirest.php/ITILCategory/');
      $resultCategory = $response->getContent(false);
      //Récupération des noms des catégories
     // var_dump( $resultCategory);
        $resultCategoryDecoded = json_decode($resultCategory, true);
        /* Test du filtre
        $filteredResults = array_filter($resultCategoryDecoded,function ($obj){
       //  print_r($obj["is_incident"]);
          return $obj["is_incident"];
        });
        $filteredResults=array_values($filteredResults);
      for($i=0;$i<count($filteredResults);$i++)
      {
        $resultCategoryNames[$filteredResults[$i]["id"]]["name"]=$filteredResults[$i]["completename"];
        $resultCategoryNames[$filteredResults[$i]["id"]]["id"]=$filteredResults[$i]["id"];
        $resultCategoryNames[$filteredResults[$i]["id"]]["category"]=$filteredResults[$i]["itilcategories_id"];

      }


      /* || Test de l'emboitement UI/backend*/
      $form = \Drupal::request()->getContent();
      $responseArray = json_decode($form, true);
      $payload["name"] = $responseArray["titre"];
      $payload["content"] = $responseArray["content"];
      $payload["itilcategories_id"] = $responseArray["categorie"];
      $jsonArray["input"] = $payload;
      $input = json_encode($jsonArray);
      $createTicket = $client->request('POST', $URL_GLPI . 'Ticket/', [
        'body' => $input]);
      $creationResult = $createTicket->toArray(false);
      $killResult = $this->connexion->kill($token, $session_token);

      return new Response(json_encode($creationResult));

    } else {
      $error["message"] = "Something went wrong.";
      $error["id"] = $user;
      $error["pass"] = $password;
      $error["session"] = $session_token;
      return new Response(json_encode($error));
    }
  }

  function filter($obj)
  {
    echo $obj;
    return $obj['is_incident'];
  }
}
