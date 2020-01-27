<?php


namespace Drupal\session_handler\Actions;
use \Drupal\node\Entity\Node;

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
      $url='https://auth.martinique.univ-ag.fr/cas/serviceValidate?service=http://127.0.0.1:8900/dsin/web/hello&ticket='.$ticket;
      $xml = file_get_contents($url);
      //  echo $xml;
      if(strpos($xml,'cas:authenticationSuccess'))
      {
        echo 'Yatta ! Banzai !';
        $newSession=$this->createSessionNode();
        return $newSession->get('title')->value;
      }
      elseif (strpos($xml,'cas:authenticationFailure'))
      {
        echo "Vous n'avez pas été reconnu par notre système. Veuillez réessayer.";
      }
      else{
        echo 'Something went horribly wrong';
      }
    }
  }

}
