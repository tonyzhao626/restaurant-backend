<?php

use Directus\Application\Http\Request;
use Directus\Application\Http\Response;
use Directus\Services\MailService;
use Directus\Services\UsersService;
use Directus\Database\Schema\SchemaManager;
use Directus\Services\ItemsService;
use Directus\Permissions\Acl;
use Zend\Db\TableGateway\TableGateway;
use Zend\Db\Sql\Select;
use Zend\Db\Sql\Insert;
use Zend\Db\Sql\Sql;

return [
    '/' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) {
            // get the request body
            $container = \Directus\Application\Application::getInstance()->getContainer();
            $dbConnection = $container->get('database');
            // gets all of the stores
            $storeGateway = new TableGateway('stores', $dbConnection);
            $stores = $storeGateway->select();

            if ($stores->count() == 1) {
                $stores = $stores->toArray();
                return $response->withJson($stores);
            }else {
                // return that stores were not defined
                return $response->withJson(['status' => 'error', 'message' => 'No stores were defined.']);
            }
        }
    ],
    '/check-post-code' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            // get the request body
            $container = \Directus\Application\Application::getInstance()->getContainer();
            $dbConnection = $container->get('database');

            $body = $request->getParsedBody();

            if (isset($body['post_code'])) {
                // check the post code
                $codeGateway = new TableGateway('delivery_and_pickup', $dbConnection);
                $result = $codeGateway->select(array('type' => 0))->toArray();
                $counter = 0;
                foreach ($result as $item) {
                    $counter++;
                    $search = $body['post_code'];
                    if (preg_match("/(\/s|\,)*{$search}(\/s|\,|)+/", $item['name'])) {
                        // if the result was found, return the value
                        return $response->withJson([
                            'status' => 'success',
                            'value' => $item['value']
                        ]);
                    }
                }
                // no result was found, return an error
                return $response->withJson([
                   'status' => 'error',
                   'message' => ''
                ]);
            }else {
                // return error that he post code is not specified
                return $response->withJson([
                    'status' => 'error',
                    'message' => 'The code was not specified.'
                ]);
            }

            if ($stores->count() == 1) {
                $stores = $stores->toArray();
                return $response->withJson($stores);
            }else {
                // return that stores were not defined
                return $response->withJson(['status' => 'error', 'message' => 'No stores were defined.']);
            }
        }
    ],
];
