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
use Zend\Db\Sql\Sql;

return [
    '/activate' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            // get the request body
            $body = $request->getParsedBody();
            if (isset($body)) {
                $result = checkJwt($body['jwt']);
                if ($result != false) {
                    // user was verified
                    $container = \Directus\Application\Application::getInstance()->getContainer();
                    $dbConnection = $container->get('database');

                    // body sends giftcard code
                    if (isset($body['giftcard'])) {
                        // use the shit
                        $giftcardGateway = new TableGateway('gift_cards', $dbConnection);
                        $giftcardSelect = new Select('gift_cards');
                        $giftcardSelect->where(array('giftcard_code' => $body['giftcard'], 'active' => 1));

                        $resultG = $giftcardGateway->selectWith($giftcardSelect);
                        if ($resultG->count() === 1) {
                            $resultG = $resultG->toArray()[0];

                            // add the giftcard ammount to the user
                            $userId = new TableGateway('user_info', $dbConnection);

                            $userDetailSelect = new Select('user_info');
                            $userDetailSelect->where(array('user_id' => $result['user']));
                            $userId = $userId->selectWith($userDetailSelect);

                            // if user exists
                            if ($userId->count() === 1) {
                                $userId = $userId->toArray()[0];
                                // update
                                $updateArray = [
                                    'credit' => $userId['credit'] + $resultG['amount']
                                ];
                                // deactivate the giftcard
                                $updatePointsGateway = new TableGateway('user_info', $dbConnection);
                                $updatePointsGateway->update($updateArray, array('user_id' => $result['user']));

                                $giftcardGateway = new TableGateway('gift_cards', $dbConnection);
                                $giftcardGateway->update(array('active' => 0), array('giftcard_code' => $body['giftcard']));

                                return $response->withJson([
                                    'status' => 'success',
                                    'message' => 'Giftcard was successfuly activated.'
                                ]);

                            }else {
                                return $response->withJson([
                                    'status' => 'error',
                                    'message' => 'User ID doesnt exist.'
                                ]);
                            }

                        }else {
                            // return error that the giftcard does not exists
                            return $response->withJson([
                               'status' => 'error',
                               'message' => 'The code does not exits'
                            ]);
                        }

                    }else {
                        // no code specified
                        return $response->withJson([
                            'status' => 'error',
                            'message' => 'The code was not specified'
                        ]);
                    }


                }else {
                    // jwt was not sent in body
                    return $response->withStatus(500)->withJson([
                        'status' => 'error',
                        'message' => 'The JWT was not verified.'
                    ]);
                }
            }else {
                // jwt was not sent in body
                return $response->withStatus(500)->withJson([
                    'status' => 'error',
                    'message' => 'The JWT is not present in the body.'
                ]);
            }
        }
    ]
];
