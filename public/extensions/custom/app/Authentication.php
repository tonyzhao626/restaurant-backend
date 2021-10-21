<?php

namespace Solcode\Authentication;

use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Insert;

class Authentication {

    /**
     * @param $jwt
     */
    public static function checkJwt($jwt){
        $container = \Directus\Application\Application::getInstance()->getContainer();
        // get connection
        $dbConnection = $container->get('database');
        $sessionTable = new TableGateway('directus_user_sessions', $dbConnection);

        $jwtSelect = new Select('directus_user_sessions');
        $jwtSelect = $jwtSelect->where(array(['token'] => $jwt));

        $verifyJwt = $sessionTable->selectWith($jwtSelect);

        if ($verifyJwt->count() == 0) {
            // return user ID
            return $verifyJwt['user'];
        }else {
            return [
                'status' => 'error',
                'message' => 'JWT was not verified.'
            ];
        }
    }

}