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

// SMTP email settings
$user = "f865efc406b3f2";
$password = "83fe95d28394f2";
$host = "smtp.mailtrap.io";
$port = 2525;

function smtp_mail($to, $from, $message, $user, $pass, $host, $port) {
    if ($h = fsockopen($host, $port))
    {
        $data = array(
            0,
            "EHLO $host",
            'AUTH LOGIN',
            base64_encode($user),
            base64_encode($pass),
            "MAIL FROM: <$from>",
            "RCPT TO: <$to>",
            'DATA',
            $message
        );

        foreach($data as $c)
        {
            $c && fwrite($h, "$c\r\n");
            while(substr(fgets($h, 256), 3, 1) != ' '){}
        }

        fwrite($h, "QUIT\r\n");
        return fclose($h);
    }
}

return [
    '/' => [
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

                    // rewards table
                    $rewardsGateway = new TableGateway('rewards', $dbConnection);
                    $rewardsSelect = new Select('rewards');

                    $rewardsSelect = $rewardsSelect->where(array('user_id' => $result['user']));

                    $rewardsResult = $rewardsGateway->selectWith($rewardsSelect);

                    // check the results
                    if ($rewardsResult->count() > 0) {
                        // get the data
                        $rewardsResult = $rewardsResult->toArray()[0];

                        return $response->withJson([
                            'points' => $rewardsResult['points'],
                            'ref_code' => $rewardsResult['ref_code']
                        ]);
                    }else {
                        // return bad response
                        return $response->withJson([
                            'status' => 'error',
                            'message' => 'There is no record with the specified user ID.'
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
    ],
    '/save-refcode' => [
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

                    // rewards table
                    $rewardsGateway = new TableGateway('rewards', $dbConnection);

                    if (isset($body['ref_code'])) {
                        // check if the code does not exist yet
                        $select = new Select('rewards');
                        $select->where(array('ref_code' => $body['ref_code']));
                        $refResult = $rewardsGateway->selectWith($select);

                        if ($refResult->count() == 0) {
                            // we can set the code
                            $updateArray = [
                                'ref_code' => $body['ref_code']
                            ];
                            $rewardsGateway->update($updateArray, array('user_id' => $result['user']));

                            return $response->withJson([
                                'status' => 'success',
                                'code' => 200,
                                'Message' => 'Updated succesfully'
                            ]);
                        }else {
                            // return error that the code is already in use
                            return $response->withJson([
                                'status' => 'error',
                                'message' => 'Code is already taken.'
                            ]);
                        }

                    }else {
                        // return error
                        return $response->withJson([
                            'status' => 'error',
                            'message' => 'The ref code was not specified.'
                        ]);
                    }

                    // check the results
                    if ($rewardsResult->count() > 0) {

                    }else {
                        // return bad response
                        return $response->withJson([
                            'status' => 'error',
                            'message' => 'There is no record with the specified user ID.'
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
    ],
    '/email-invite' => [
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

                    // rewards table
                    $rewardsGateway = new TableGateway('rewards', $dbConnection);

                    // check the subject, to & message
                    if (isset($body['subject']) && isset($body['to']) && isset($body['message'])) {
                        // get the refferal code
                        $rewardsGateway = new TableGateway('rewards', $dbConnection);
                        $rewardsSelect = new Select('rewards');

                        $rewardsSelect = $rewardsSelect->where(array('user_id' => $result['user']));
                        $rewardsResult = $rewardsGateway->selectWith($rewardsSelect);

                        // check the results
                        if ($rewardsResult->count() > 0) {
                            // get the data
                            $rewardsResult = $rewardsResult->toArray()[0];
                            $email = $body['to'];
                            $subject = $body['subject'];
                            $message = $body['message'];
                            if ($rewardsResult['ref_code']) {
                                global $user, $password, $host, $port;
                                // send the email
                                try {
                                    mail($body['to'], 'Invitation | AtlantaMealsPrep', $message);
                                }catch (\Exception $e) {
                                    return $response->withJson([
                                        'status' => 'success',
                                        'message' => $e->getMessage()
                                    ]);
                                }
                                return $response->withJson([
                                    'status' => 'success',
                                    'message' => 'email was succesfully sent'
                                ]);
                            }else {
                                return $response->withJson([
                                   'status' => 'error',
                                   'message' => 'User doesnt have a refferal code.'
                                ]);
                            }

                        }else {
                            // return bad response
                            return $response->withJson([
                                'status' => 'error',
                                'message' => 'There is no record with the specified user ID.'
                            ]);
                        }


                    }else {
                        // return error
                        return $response->withJson([
                           'status' => 'error',
                           'message' => 'Subject, to and message is not present in the request.'
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
    ],
];
