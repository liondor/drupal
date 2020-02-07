<?php


namespace Drupal\session_handler\Actions;

use Drupal\node\Entity\Node;

class SessionOpen
{

  private function createSessionNode()
  {
    $node = Node::create([
      'type' => 'session',
      'title' =>  substr(md5(rand()), 0, 16)
    ]);
    $node->save();
    return $node;
  }
  public function openSession($ticket)
  {
    if($ticket)
    {
      $url = 'https://auth.martinique.univ-ag.fr/cas/serviceValidate?service=http://localhost:8900/projets&ticket=' . $ticket;
      $xml = file_get_contents($url);

      //  echo $xml;
      if(strpos($xml,'cas:authenticationSuccess'))
      {
        $newSession=$this->createSessionNode();
        $result['id_session'] = $newSession->get('title')->value;
        return $result;
      }
      elseif (strpos($xml,'cas:authenticationFailure'))
      {
        $result['message'] = "Authentification failed : Vous n'avez pas été reconnu";
        return $result;
      }
      else{
        $result['message'] = "Something went horribly wrong";
        return $result;
      }
    }
  }

}
