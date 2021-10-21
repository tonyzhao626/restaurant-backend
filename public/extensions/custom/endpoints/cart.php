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
use GuzzleHttp\Client;


return [
    '/get-cart-id' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) {
            // get all of the IDs
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');
            $tableGateway = new TableGateway('carts', $dbConnection);

            // gets unique ID
            $cartUniqueId = uniqid();

            // this is going to be inserted in the database
            $insertionArray = [];
            $insertionArray['uuid'] = $cartUniqueId;
            $insertionArray['cart_content'] = [];

            $tableGateway->insert($insertionArray);

            // return object
            $returnPayload = [
                'id' => $cartUniqueId
            ];

            return $response->withJson($returnPayload);
        }
    ],
    // requires JSON for the cart content
    // requires JSON parameter of UUID
    '/save-cart-content' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            // get all of the IDs
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');
            $tableGateway = new TableGateway('carts', $dbConnection);
            // get the request body
            $requestBody = $request->getParsedBody();
            if ($requestBody && isset($requestBody['cartObject']) && isset($requestBody['id'])) {
                $dataToUpdate = [
                    'cart_content' => json_encode($requestBody['cartObject'])
                ];
                $where['uuid = ?'] = $requestBody['id'];

                $tableGateway->update($dataToUpdate, $where);

                // return object
                $returnPayload = [
                    'status' => 'success'
                ];

                return $response->withJson($returnPayload);
            } else {
                // return error of not present body
                return $response->withJson([
                    'status' => 'error',
                    'message' => 'The request does not contain required properties.'
                ]);
            }
        }
    ],
    '/create-new-order' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            global $gatewayApi;
            // get all of the IDs
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');
            $tableGateway = new TableGateway('carts', $dbConnection);
            $requestBody = $request->getParsedBody();

            $result = checkJwt($requestBody['jwt']);

            if ($result != false) {
                // check if the requested parameters are present in the body
                if (isset($requestBody['firstName']) && isset($requestBody['lastName']) && isset($requestBody['emailAddress'])
                    && isset($requestBody['paymentMode']) && isset($requestBody['deliveryMode']) && isset($requestBody['orderContent'])) {

                    $resultArray = [];

                    if ($requestBody['orderContent'] != '' && isset($requestBody['orderContent']['meals'])) {
                        // json to array
                        // create the product table connection
                        $productConnection = new TableGateway('meal_products', $dbConnection);
                        $sideDishConnection = new TableGateway('side_dishes', $dbConnection);
                        // loop through meals
                        $counter = 1;
                        foreach ($requestBody['orderContent']['meals'] as $meal) {
                            // check if the meal exists
                            $mealCheck = $productConnection->select(array('id' => $meal['id']));

                            // if meal exists
                            if ($mealCheck->count() == 1) {
                                array_push($resultArray, '<b>MEAL ' . $counter . '</b> - ' . $meal['name'] . '<p>&nbsp;</p>');

                            }else {
                                array_push($resultArray, 'error ' . $mealCheck->count() . ' and it ID is: ' . $meal['name']);
                                return $response->withStatus(500)->withJson([
                                    'error' => 500,
                                    'message' => 'Something went wrong.'
                                ]);
                            }
                            $counter++;
                        }

                        // loop through the sides
                        $counter = 1;
                        foreach ($requestBody['orderContent']['dishes'] as $dishes) {
                            foreach ($dishes as $dish) {
                                // check if the meal exists
                                $mealCheck = $sideDishConnection->select(array('id' => $dish['id']));

                                // if meal exists
                                if ($mealCheck->count() == 1) {
                                    array_push($resultArray, '<b>DISH for ' . $counter . 'nd meal</b> - ' . $dish['name'] . '<p>&nbsp;</p>');
                                }else {
                                    array_push($resultArray, 'error ' . $mealCheck->count() . ' and it ID is: ' . $dish['id']);
                                    return $response->withStatus(500)->withJson([
                                        'error' => 500,
                                        'message' => 'Something went wrong.'
                                    ]);
                                }
                            }
                            $counter++;
                        }

                        // loop through the breakfast
                        $counter = 1;
                        foreach ($requestBody['orderContent']['breakfast'] as $breakfast) {
                            // check if the meal exists
                            $mealCheck = $productConnection->select(array('id' => $breakfast['id']));

                            // if meal exists
                            if ($mealCheck->count() == 1) {
                                array_push($resultArray, '<b>BREAKFAST ' . $counter . '</b> - ' . $breakfast['name'] . '<p>&nbsp;</p>');
                            }else {
                                array_push($resultArray, 'error ' . $mealCheck->count() . ' and it ID is: ' . $breakfast['name']);
                            }
                            $counter++;
                        }

                        // loop through the snacks
                        $counter = 1;
                        foreach ($requestBody['orderContent']['snacks'] as $snack) {
                            // check if the meal exists
                            $mealCheck = $productConnection->select(array('id' => $snack['id']));

                            // if meal exists
                            if ($mealCheck->count() == 1) {
                                array_push($resultArray, 'SNACK ' . $counter . ' - ' . $snack['name']);
                            }else {
                                array_push($resultArray, 'error ' . $mealCheck->count() . ' and it ID is: ' . $snack['name']);
                            }
                            $counter++;
                        }

                        // loop through the vegan bowl
                        $counter = 1;
                        foreach ($requestBody['orderContent']['snacks'] as $bowl) {
                            // check if the meal exists
                            $mealCheck = $productConnection->select(array('id' => $bowl['id']));

                            // if meal exists
                            if ($mealCheck->count() == 1) {
                                array_push($resultArray, 'VEGAN BOWL ' . $counter . ' - ' . $bowl['name']);
                            }else {
                                array_push($resultArray, 'error ' . $mealCheck->count() . ' and it ID is: ' . $bowl['name']);
                            }
                            $counter++;
                        }
                    }else {
                        // todo return error
                    }

                    // oricess the orders
                    $orderContentReadable = '';
                    foreach ($resultArray as $item) {
                        $orderContentReadable .= $item;
                    }

                    // todo count the price omg
                    $generalInformationGateway = new TableGateway('general_information', $dbConnection);
                    $mealPrice = $generalInformationGateway->select(array('id' => 7));

                    $totalPrice = 0;
                    if ($mealPrice->count() == 1) {
                        $mealPriceArr = $mealPrice->toArray();
                        // count the price
                        foreach ($requestBody['orderContent']['meals'] as $meal) {
                            $totalPrice += $mealPriceArr[0]['value'];
                            $totalPrice += $meal['additional_price'];
                        }

                    }else {
                        // return error.
                    }
                    // todo end of counting the price

                    // create the order
                    $orderGateway = new TableGateway('orders', $dbConnection);

                    $insertOrderArray = [
                        'status' => 'nonpaid',
                        'created_on' => date('Y-m-d h:m:s'),
                        'order_content_readable' => $orderContentReadable,
                        'order_content' => $requestBody['orderContent'],
                        'delivery_type' => $requestBody['deliveryMode'],
                        'payment_type' => $requestBody['paymentMode'],
                        'first_name' => $requestBody['firstName'],
                        'last_name' => $requestBody['lastName'],
                        'email' => $requestBody['emailAddress'],
                        'total_price' => $totalPrice,
                        'user_id' => $result['user']
                    ];

                    // TODO PAYMENT AND DELIVERY
                    // check what is the payment type
                    // CREDIT CARD PAYMENT
                    // todo payment mode
                    if ($requestBody['paymentMode'] == 1) {
                        // call the API
                    } else if ($requestBody['paymentMode'] == 2) {
                        // PAYPAL PAYMENT

                    }

                    // todo add points to the user, if paid.
                    $userInfoGateway = new TableGateway('user_info', $dbConnection);

                    // check what is the delivery type
                    // DELIVERY TYPE
                    // todo delivery mode
                    if ($requestBody['deliveryMode'] == 1) {
                        // todo SAVE THE DELIVERY ADDRESS, TIMEZONE

                    } else if ($requestBody['deliveryMode'] == 2) {
                        // PICK UP TYPE
                        // todo SAVE THE PICKUP STORE

                    }
                    // TODO END OF PAYMENT AND DELIVERY

                    if ($orderGateway->insert($insertOrderArray)) {
                        // return positive answer
                        //return $response->withJson([
                        //    'status' => 'succeed',
                        //    'code' => 200,
                        //    'message' => 'Order was succesfully created.'
                        //]);
                    }

                    // todo test the API
                    $paymentApiObject = [
                        'method' => 'credit_card',
                        'transaction_type' => 'purchase',
                        'amount' => 500,
                        'currency_code' => 'USD',
                        'credit_card' => [
                            'cardholder_name' => 'Matthew Husak',
                            'type' => 'visa',
                            'card_number' => '4111111111111111',
                            'exp_date'=> '1230',
                            'cvv' => '123'
                        ]
                    ];

                    //return $response->withJson($paymentApiObject);
                    // todo creating PAYEEZE INSTANCE
                    $client = new Payeezy_Client();
                    $client->setApiKey("api");
                    $client->setApiSecret("secret");
                    $client->setMerchantToken("token");
                    $client->setUrl("https://api-cert.payeezy.com/v1/transactions");


                    $card_transaction = new Payeezy_CreditCard($client);

                    try {
                        $response = $card_transaction->authorize(
                            [
                                "amount" => "100",
                                "currency_code" => "USD",
                                "credit_card" => array(
                                    "type" => "visa",
                                    "cardholder_name" => "John Smith",
                                    "card_number" => "4111111111111111",
                                    "exp_date" => "2030",
                                    "cvv" => "123"
                                )
                            ]
                        );
                    } catch (Exception $e) {
                        return $response->withJson(['error' => $e->getMessage()]);
                    }

                    // end of testing the API
                    return $response->withJson($paymentApiObject);

                }
            }

        }
    ],
];
