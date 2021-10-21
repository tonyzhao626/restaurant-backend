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
    '/' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) {
            // get all of the IDs between
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');

            $tableGateway = new TableGateway('meal_menus', $dbConnection);
            $mealMenuIDs = $tableGateway->select('CURRENT_DATE >= valid_from AND CURRENT_DATE <= valid_to')->toArray();

            return $response->withJson($mealMenuIDs);
        }
    ],
    '/get-meals' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) {
            // get all of the IDs between
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');

            $tableGateway = new TableGateway('meal_menus', $dbConnection);
            $mealMenuIDs = $tableGateway->select('CURRENT_DATE >= valid_from AND CURRENT_DATE <= valid_to')->toArray();

            return $response->withJson($mealMenuIDs);
        }
    ],
];
