<?php
use Directus\Application\Http\Request;
use Directus\Application\Http\Response;
use Directus\Services\UsersService;
use Directus\Database\Schema\SchemaManager;
use Directus\Services\ItemsService;
use Directus\Permissions\Acl;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Insert;

return [
    '/get-cart-id' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            // get all of the IDs
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');
            $tableGateway = new TableGateway('orders', $dbConnection);

            // get the request body
            $body = $request->getParsedBody();

            // check the userIDs
            if (isset($body['userId'])) {

            }

            // return object

            return $response->withJson($returnPayload);
        }
    ]
];
