<?php

namespace Drupal\session_handler\Actions;

use Drupal\node\Entity\Node;

class SessionVerify
{
  public function isSessionValid($sessionID)
  {
    $queryResult = \Drupal::entityQuery('node')->condition('type','session')->condition('title',$sessionID)->execute();
    $nodes =  Node::loadMultiple($queryResult);
    foreach($nodes as $node)
    {
      $date= $node->get('field_date_expiration')->value;
    }
    $date= strtotime($date);
    $dateWithCorrectTimeZone = $date-14400;
    $serverDate= time();
    $result=$dateWithCorrectTimeZone-$serverDate;
    if($result>0)
    {
     return true;
    }
    else{
    return false;
    }
  }
}

