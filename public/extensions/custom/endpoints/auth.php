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
    '/register' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            // create account
            $body = $request->getParsedBody();

            if (isset($body['email']) && isset($body['password'])) {
                // get containerw
                $container = \Directus\Application\Application::getInstance()->getContainer();
                // get connection
                $dbConnection = $container->get('database');

                // create table gateway
                $tableGateway = new TableGateway('directus_users', $dbConnection);

                $select = new Select(SchemaManager::COLLECTION_USERS);
                $select->where("email = " . "'" . $body['email'] . "'");
                $result = $tableGateway->selectWith($select);

                // if user is not created
                if ($result->count() == 0) {
                    // todo assign him to the KLAVIO MANAGEMENT for emails

                    // create the user
                    $body['role'] = 3;
                    $body['password'] = password_hash($body['password'], PASSWORD_BCRYPT);
                    $body['status'] = 'active';
                    $result = $tableGateway->insert($body);

                    $insertId = $tableGateway->getLastInsertValue();
                    // create the row in the new database
                    $userInfoGateway = new TableGateway('user_info', $dbConnection);
                    $userInfoGateway->insert([
                       'user_id' => $insertId,
                       'display_name' => ''
                    ]);

                    // todo check for refferal code
                    // todo create refferal points
                    $rewardGateway = new TableGateway('rewards', $dbConnection);
                    $rewardsInsert = [
                        'user_id' => $insertId,
                        'points' => 0,
                        'ref_code' => uniqid()
                    ];
                    $rewardGateway->insert($rewardsInsert);

                    return $response->withJson([
                        'message' => 'The user was created.',
                        'status' => 1
                    ]);
                }else {
                    // throw error
                    return $response->withJson([
                        'error' => 'The user with this e-mail already exists.',
                        'status' => 0
                    ]);
                }
            }else {
                return $response->withJson([
                    'error' => 'The request does not contain the requested properties.',
                    'status' => 0
                ]);
            }
        }
    ],
];
