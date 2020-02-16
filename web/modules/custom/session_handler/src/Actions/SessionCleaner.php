<?php

namespace Drupal\session_handler\Actions;

use Drupal\node\Entity\Node;

/**
 * Implement hook_cron()
 */
class SessionCleaner
{
  private $sessionVerify;

  public function __construct(SessionVerify $sessionVerify)
  {
    $this->sessionVerify = $sessionVerify;
  }


}
