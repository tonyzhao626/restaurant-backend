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
use Zend\Filter\Encrypt;

/**
 * @param $jwt
 */
function checkJwt($jwt){
    $container = \Directus\Application\Application::getInstance()->getContainer();
    // get connection
    $dbConnection = $container->get('database');

    $sessionTable = new TableGateway('directus_user_sessions', $dbConnection);

    $jwtSelect = new Select('directus_user_sessions');
    $jwtSelect = $jwtSelect->where(array('token' => $jwt));

    $verifyJwt = $sessionTable->selectWith($jwtSelect);

    if ($verifyJwt->count() != 0) {
        // return user ID
        return $verifyJwt->toArray()[0];
    }else {
        return false;
    }
}

class cryptor {

    /**
     * public gist:
     * https://gist.github.com/petermuller71/33616d55174d9725fc00a663d30194ba
     *
     * @param      string       $message          Text, to be encrypted
     * @param      string       $ciphertext       Text, to be decrypted
     * @param      string       $secret           Secret_key (hashvalue is created from this string(+salt) in order to get a 32bytes key).
     *
     * @return     string       Encrypted or decrypted text
     *
     * @license    http://www.opensource.org/licenses/mit-license.html  MIT License
     * @copyright  2018 Peter Muller. All rights reserved.
     * @author     Peter Muller <petermuller71@gmail.com>
     * @version    2.02
     *
     */

    static private $salt        = "salt";       # change
    static private $hashlength  = 30;           # change between 10 and 64 (64 = length of sodium_crypto_generichash)

    /*
     * encrypt
     *
     * @param   string    $secret      (password)
     * @param   string    $plaintext   (plaintext)
     * @return  string    Encrypted text (ciphertext + nonce + hash)
     *
     */

    public static function encrypt($secret, $plaintext) {

        // Create a 32bit password
        $key = self::create_32bit_password($secret);

        // Create a nonce: a piece of non-secret unique data that is used to randomize the cipher (safety against replay attack).
        // The nonce should be stored or shared along with the ciphertext, because the nonce needs to be reused with the same key.
        // In this class the nonce is shared with the ciphertext.
        $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);

        // Encrypted
        $ciphertext = bin2hex(
            sodium_crypto_secretbox($plaintext, $nonce, $key)
        );

        // Hex nonce (in order to sent together with ciphertext)
        $nonce_hex = bin2hex($nonce);

        // Create hash from ciphertext+nonce
        // It is not necessary, but just an extra layer of defense:
        // - more difficult to manipulate the string
        // - a nonce is always 48 characters. Because of a trailing hash (of unkown length), the nonce cannot be identified easily.
        //   (a nonce does not have to be secret, this is just an extra precaution)
        $hash = self::create_hash($ciphertext.$nonce_hex);

        // Return ciphertext + nonce + hash
        return $ciphertext.$nonce_hex.$hash;
    }


    /*
     * decrypt
     *
     * @param   string    $secret      (password)
     * @param   string    $ciphertext  (ciphertext + nonce + hash)
     * @return  string    decrypted text
     *
     */

    public static function decrypt($secret, $ciphertext) {

        // Create a 32bit password
        $key     = self::create_32bit_password($secret);

        //Get hash
        $hash            = substr($ciphertext,-self::$hashlength);

        //Get ciphertext + nonce (remove trailing hash)
        $ciphertext      = substr($ciphertext,0,-self::$hashlength);

        //Re-create hash
        $hash_on_the_fly = self::create_hash($ciphertext);

        //Check if hash is correct
        if ($hash !== $hash_on_the_fly)
        {
            //Do propper error handling
            return "error";
        }
        else
        {
            // Get nonce (last 48 chars of string)
            $nonce_hex  = substr($ciphertext,-48);

            // Get ciphertext (remove nonce)
            $ciphertext = substr($ciphertext,0,-48);

            // Bin nonce
            $nonce      = hex2bin($nonce_hex);

            // Decrypted
            $plaintext = sodium_crypto_secretbox_open(
                hex2bin($ciphertext), $nonce, $key
            );

            return $plaintext;
        }
    }


    /*
     * create_32bit_password
     *
     * @param   string    $secret      (password)
     * @return  string    32bit-password
     *
     */

    private static function create_32bit_password($secret)
    {
        //Openlib needs a 32bit key for encryption
        return substr( bin2hex( sodium_crypto_generichash($secret.self::$salt) ),0 ,32);
    }


    /*
     * create_hash of ciphertext+nonce
     *
     * @param   string    $ciphertext_and_nonce   (ciphertext + nonce)
     * @return  string    hash
     *
     */

    private static function create_hash($ciphertext_and_nonce)
    {
        return substr( bin2hex( sodium_crypto_generichash( $ciphertext_and_nonce ) ),0 ,self::$hashlength);
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

                    // get the user object
                    $userObject = new TableGateway('directus_users', $dbConnection);
                    $userSelect = new Select('directus_users');
                    $userSelect = $userSelect->where(array('id' => $result['user']));
                    $user = $userObject->selectWith($userSelect)->toArray()[0];

                    $responseJson = [
                        'first_name' => $user['first_name'],
                        'last_name' => $user['last_name'],
                        'email' => $user['email']
                    ];

                    // check the display name
                    $userInfo = new TableGateway('user_info', $dbConnection);
                    $userInfoSelect = new Select('user_info');
                    $userInfoSelect = $userInfoSelect->where(array('user_id' => $result['user']));
                    $userInfoSelect = $userInfo->selectWith($userInfoSelect);
                    if($userInfoSelect->count() > 0) {
                        $userInfoSelect = $userInfoSelect->toArray()[0];
                        $responseJson['display_name'] = $userInfoSelect['display_name'];
                    }

                    // return object
                    return $response->withJson($responseJson);
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
    // requires
    // first_name & last_name & email & display_name
    '/save-profile' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            $body = $request->getParsedBody();
            if (isset($body)) {
                $result = checkJwt($body['jwt']);
                if ($result != false) {
                    if (isset($body['first_name']) && isset($body['last_name']) && isset($body['email']) && isset($body['display_name'])) {
                        // user was verified
                        $container = \Directus\Application\Application::getInstance()->getContainer();
                        $dbConnection = $container->get('database');
                        // get the user object
                        $userObject = new TableGateway('directus_users', $dbConnection);

                        $updateArray = [
                            'first_name' => $body['first_name'],
                            'last_name' => $body['last_name'],
                            'email' => $body['email']
                        ];
                        $userObject->update($updateArray, array('id' => $result['user']));

                        // update the display name
                        $userInfo = new TableGateway('user_info', $dbConnection);

                        $updateDisplayName = [
                            'display_name' => $body['display_name']
                        ];
                        //return $response->withJson($result);
                        $userInfo->update($updateDisplayName, array('user_id' => $result['user']));

                        return $response->withJson([
                            'status' => 'success',
                            'message' => 'User profile was successfully updated.'
                        ]);

                    }else {
                        // required parameters are not present
                        return $response->withStatus(500)->withJson([
                            'status' => 'error',
                            'message' => 'Required parameters are not present in the request.'
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
        }
    ],
    '/delivery-address' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            $body = $request->getParsedBody();
            if (isset($body)) {
                $result = checkJwt($body['jwt']);
                if ($result != false) {
                    // user was verified
                    $container = \Directus\Application\Application::getInstance()->getContainer();
                    $dbConnection = $container->get('database');
                    if (isset($body['state']) && isset($body['town']) && isset($body['street']) && isset($body['zip']) && isset($body['name_as_account_name']) && isset($body['use_this_as_billing_address'])) {
                        $deliveryAddressGateway = new TableGateway('delivery_address', $dbConnection);
                        $addressSelect = new Select('delivery_address');
                        $addressSelect = $addressSelect->where(array('user_id' => $result['user']));
                        $addressResult = $deliveryAddressGateway->selectWith($addressSelect);

                        if ($body['state'] != '' && $body['town'] != '' && $body['street'] != ''  && $body['zip'] != '') {
                            // add or edit delivery address
                            if ($addressResult->count() > 0) {
                                // update the record
                                $deliveryAddressGateway->update([
                                    'country' => 'United States (US)',
                                    'state' => $body['state'],
                                    'town' => $body['town'],
                                    'street' => $body['street'],
                                    'zip' => $body['zip'],
                                    'company' => ($body['company'] != '') ? $body['company'] : false,
                                    'use_this_as_billing_address' => $body['use_this_as_billing_address'],
                                    'name_as_account_name' => $body['name_as_account_name'],
                                    'first_name' => $body['first_name'],
                                    'last_name' => $body['last_name']

                                ], array('user_id' => $result['user']));

                                $deliveryAddressGateway = new TableGateway('delivery_address', $dbConnection);
                                $addressSelect = new Select('delivery_address');
                                $addressSelect = $addressSelect->where(array('user_id' => $result['user']));
                                $addressResult = $deliveryAddressGateway->selectWith($addressSelect);
                                if ($addressResult->count() > 0) {
                                    return $response->withJson($addressResult->toArray()[0]);
                                }else {
                                    return $response->withJson([
                                        'status' => 'error',
                                        'message' => 'There was an error creating the address'
                                    ]);
                                }
                            }else {
                                // create new record
                                $deliveryAddressGateway->insert([
                                   'user_id' => $result['user'],
                                   'country' => 'United States (US)',
                                   'state' => $body['state'],
                                    'town' => $body['town'],
                                    'street' => $body['street'],
                                    'zip' => $body['zip'],
                                    'company' => ($body['company'] != '') ? $body['company'] : false,
                                    'use_this_as_billing_address' => $body['use_this_as_billing_address'],
                                    'name_as_account_name' => $body['name_as_account_name'],
                                    'first_name' => isset($body['first_name']) ? $body['first_name'] : '',
                                    'last_name' => isset($body['last_name']) ? $body['last_name'] : false
                                ]);

                                $deliveryAddressGateway = new TableGateway('delivery_address', $dbConnection);
                                $addressSelect = new Select('delivery_address');
                                $addressSelect = $addressSelect->where(array('user_id' => $result['user']));
                                $addressResult = $deliveryAddressGateway->selectWith($addressSelect);
                                if ($addressResult->count() > 0) {
                                    return $response->withJson($addressResult->toArray()[0]);
                                }else {
                                    return $response->withJson([
                                        'status' => 'error',
                                        'message' => 'There was an error creating the address'
                                    ]);
                                }
                            }
                        }
                    }else {
                        // required parameters are not present
                        $deliveryAddressGateway = new TableGateway('delivery_address', $dbConnection);
                        $addressSelect = new Select('delivery_address');
                        $addressSelect = $addressSelect->where(array('user_id' => $result['user']));
                        $addressResult = $deliveryAddressGateway->selectWith($addressSelect);
                        if ($addressResult->count() > 0) {
                            return $response->withJson($addressResult->toArray()[0]);
                        }else {
                            return $response->withJson([
                                'status' => 'error',
                                'message' => 'Something went wrong'
                            ]);
                        }
                    }
                }else {
                    // jwt was not sent in body
                    return $response->withStatus(500)->withJson([
                        'status' => 'error',
                        'message' => 'The JWT is not present in the body.'
                    ]);
                }
            }
        }
    ],
    '/billing-address' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            $body = $request->getParsedBody();
            if (isset($body)) {
                $result = checkJwt($body['jwt']);
                try {
                    if ($result != false) {
                        // user was verified
                        $container = \Directus\Application\Application::getInstance()->getContainer();
                        $dbConnection = $container->get('database');
                        if (isset($body['state']) && isset($body['town']) && isset($body['street']) && isset($body['zip']) && isset($body['name_as_account_name']) && isset($body['use_this_as_delivery_address']) && isset($body['phone_number']) && isset($body['email'])) {
                            $deliveryAddressGateway = new TableGateway('billing_address', $dbConnection);
                            $addressSelect = new Select('billing_address');
                            $addressSelect = $addressSelect->where(array('user_id' => $result['user']));
                            $addressResult = $deliveryAddressGateway->selectWith($addressSelect);


                            if ($body['state'] != '' && $body['town'] != '' && $body['street'] != ''  && $body['zip'] != '') {
                                // add or edit delivery address
                                if ($addressResult->count() > 0) {
                                    // update the record
                                    $deliveryAddressGateway->update([
                                        'country' => 'United States (US)',
                                        'state' => $body['state'],
                                        'town' => $body['town'],
                                        'street' => $body['street'],
                                        'zip' => $body['zip'],
                                        'email' => $body['email'],
                                        'phone_number' => $body['phone_number'],
                                        'company' => ($body['company'] != '') ? $body['company'] : false,
                                        'use_this_as_delivery_address' => $body['use_this_as_delivery_address'],
                                        'name_as_account_name' => $body['name_as_account_name'],
                                        'first_name' => $body['first_name'],
                                        'last_name' => $body['last_name']

                                    ], array('user_id' => $result['user']));

                                    $deliveryAddressGateway = new TableGateway('billing_address', $dbConnection);
                                    $addressSelect = new Select('billing_address');
                                    $addressSelect = $addressSelect->where(array('user_id' => $result['user']));
                                    $addressResult = $deliveryAddressGateway->selectWith($addressSelect);
                                    if ($addressResult->count() > 0) {
                                        return $response->withJson($addressResult->toArray()[0]);
                                    }else {
                                        return $response->withJson([
                                            'status' => 'error',
                                            'message' => 'There was an error creating the address'
                                        ]);
                                    }
                                }else {
                                    // create new record
                                    $deliveryAddressGateway->insert([
                                        'user_id' => $result['user'],
                                        'country' => 'United States (US)',
                                        'state' => $body['state'],
                                        'town' => $body['town'],
                                        'street' => $body['street'],
                                        'zip' => $body['zip'],
                                        'email' => $body['email'],
                                        'phone_number' => $body['phone_number'],
                                        'company' => ($body['company'] != '') ? $body['company'] : false,
                                        'use_this_as_delivery_address' => $body['use_this_as_delivery_address'],
                                        'name_as_account_name' => $body['name_as_account_name'],
                                        'first_name' => isset($body['first_name']) ? $body['first_name'] : '',
                                        'last_name' => isset($body['last_name']) ? $body['last_name'] : false
                                    ]);

                                    $deliveryAddressGateway = new TableGateway('billing_address', $dbConnection);
                                    $addressSelect = new Select('billing_address');
                                    $addressSelect = $addressSelect->where(array('user_id' => $result['user']));
                                    $addressResult = $deliveryAddressGateway->selectWith($addressSelect);
                                    if ($addressResult->count() > 0) {
                                        return $response->withJson($addressResult->toArray()[0]);
                                    }else {
                                        return $response->withJson([
                                            'status' => 'error',
                                            'message' => 'There was an error creating the address'
                                        ]);
                                    }
                                }
                            }
                        }else {
                            // required parameters are not present
                            $deliveryAddressGateway = new TableGateway('billing_address', $dbConnection);
                            $addressSelect = new Select('billing_address');
                            $addressSelect = $addressSelect->where(array('user_id' => $result['user']));
                            $addressResult = $deliveryAddressGateway->selectWith($addressSelect);
                            if ($addressResult->count() > 0) {
                                return $response->withJson($addressResult->toArray()[0]);
                            }else {
                                return $response->withJson([
                                    'status' => 'error',
                                    'message' => 'Something went wrong'
                                ]);
                            }
                        }
                    }else {
                        // jwt was not sent in body
                        return $response->withStatus(500)->withJson([
                            'status' => 'error',
                            'message' => 'The JWT is not present in the body.'
                        ]);
                    }
                } catch (Exception $e) {
                    return $response->withJson([
                       'error' => $e->getMessage()
                    ]);
                }
            }
        }
    ],
    '/add-card' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            $body = $request->getParsedBody();
            if (isset($body)) {
                $result = checkJwt($body['jwt']);
                if ($result != false) {
                    if (isset($body['card_number']) && isset($body['expiration']) && isset($body['cvc'])) {
                        // user was verified
                        $container = \Directus\Application\Application::getInstance()->getContainer();
                        $dbConnection = $container->get('database');

                        $cardGateway = new TableGateway('cards', $dbConnection);
                        // jwt was not sent in body
                        // get user object
                        $userGateway = new TableGateway('directus_users', $dbConnection);
                        $userSelect = new Select('directus_users');
                        $userSelect = $userSelect->where(array('id' => $result['user']));
                        $userResult = $userGateway->selectWith($userSelect);

                        if ($userResult->count() > 0) {
                            $userResult = $userResult->toArray()[0];
                            // create the encryption key
                            $encryptionUUID = '9aefc960-15fd-11eb-adc1-0242ac120002';
                            $timestamp = strtotime('now');
                            $password = $userResult['password'];

                            $encryptionKey = $password . $encryptionUUID . $timestamp;
                            $encryptedToken = cryptor::encrypt($encryptionKey, $body['card_number']);
                            $encryptedCVC = cryptor::encrypt($encryptionKey, $body['cvc']);

                            // insert into DB
                            $cardGateway->insert([
                                'user_id' => $result['user'],
                                'timestamp' => $timestamp,
                                'four_digits' => substr($body['card_number'], -4),
                                'expiration' => $body['expiration'],
                                'cvc' => $encryptedCVC,
                                'card_number' => $encryptedToken,
                            ]);

                            // now, return the array of all saved cards
                            $cardGateway = new TableGateway('cards', $dbConnection);
                            $userSelect = new Select('cards');
                            $userSelect = $userSelect->where(array('user_id' => $result['user']));
                            $cardResult = $cardGateway->selectWith($userSelect);

                            return $response->withJson($cardResult->toArray());
                        }else {
                            return $response->withJson([
                                'status' => 'error',
                                'message' => 'User was not found.'
                            ]);
                        }
                    } else {
                        // jwt was not sent in body
                        return $response->withStatus(500)->withJson([
                            'status' => 'error',
                            'message' => 'The JWT is not present in the body.'
                        ]);
                    }
                }
            }
        }
    ],
    '/remove-card' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            $body = $request->getParsedBody();
            if (isset($body)) {
                $result = checkJwt($body['jwt']);
                if ($result != false) {
                    if (isset($body['id'])) {
                        // user was verified
                        $container = \Directus\Application\Application::getInstance()->getContainer();
                        $dbConnection = $container->get('database');
                        $cardGateway = new TableGateway('cards', $dbConnection);

                        //$cardGateway = new TableGateway('cards', $dbConnection);
                        //$deleteSelect = new Select('cards');
                        //$deleteSelect = $deleteSelect->where(array('user_id' => $result['user'], 'id' => $body['id']));
                        $cardGateway->delete(array('user_id' => $result['user'], 'id' => $body['id']));
                        // now, return the array of all saved cards

                        $cardGateway = new TableGateway('cards', $dbConnection);
                        $userSelect = new Select('cards');
                        $userSelect = $userSelect->where(array('user_id' => $result['user']));
                        $cardResult = $cardGateway->selectWith($userSelect);

                        return $response->withJson($cardResult->toArray());
                    } else {
                        // jwt was not sent in body
                        return $response->withStatus(500)->withJson([
                            'status' => 'error',
                            'message' => 'The JWT is not present in the body.'
                        ]);
                    }
                }
            }
        }
    ],
    '/get-cards' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            $body = $request->getParsedBody();
            if (isset($body)) {
                $result = checkJwt($body['jwt']);
                if ($result != false) {
                    $container = \Directus\Application\Application::getInstance()->getContainer();
                    $dbConnection = $container->get('database');
                    $cardGateway = new TableGateway('cards', $dbConnection);

                    $cardGateway = new TableGateway('cards', $dbConnection);
                    $userSelect = new Select('cards');
                    $userSelect = $userSelect->where(array('user_id' => $result['user']));
                    $cardResult = $cardGateway->selectWith($userSelect);

                    return $response->withJson($cardResult->toArray());
                }
            }
        }
    ],
    '/change-password' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            $body = $request->getParsedBody();
            if (isset($body)) {
                $result = checkJwt($body['jwt']);
                if ($result != false) {
                    if (isset($body['password']) && $body['new_password']) {
                        $container = \Directus\Application\Application::getInstance()->getContainer();
                        $dbConnection = $container->get('database');

                        $usersGateway = new TableGateway('directus_users', $dbConnection);
                        $resultUser = $usersGateway->select(array('id' => $result['user']));

                        if ($resultUser->count() > 0) {
                            $resultUser = $resultUser->toArray()[0];
                            $passwordHashFromDB = $resultUser['password'];

                            if (password_verify($body['password'], $resultUser['password'])) {
                                // password is verified
                                // we can change it now.
                                $newPassword = password_hash($body['new_password'], PASSWORD_BCRYPT);
                                $usersGateway->update(array('password' => $newPassword));

                                // rehash the credit card info, since the key is based on password hash, etc.
                                $cardGateway = new TableGateway('cards', $dbConnection);
                                $userSelect = new Select('cards');
                                $userSelect = $userSelect->where(array('user_id' => $result['user']));
                                $cardResult = $cardGateway->selectWith($userSelect);

                                if ($cardResult->count() > 0) {
                                    $cardResult = $cardResult->toArray();

                                    // loop through the cards and reset them
                                    foreach ($cardResult as $key => $card) {
                                        $decryptionUUID = '9aefc960-15fd-11eb-adc1-0242ac120002';
                                        $decryptionKey = $resultUser['password'] . $decryptionUUID . $card['timestamp'];

                                        $decryptedCardNumber = cryptor::decrypt($decryptionKey, $card['card_number']);
                                        $decryptedCardCvc = cryptor::decrypt($decryptionKey, $card['cvc']);

                                        // encrypt with the new password
                                        $timestamp = strtotime('now');
                                        $encryptionKey = $newPassword . $encryptionUUID . $timestamp;
                                        $encryptedToken = cryptor::encrypt($encryptionKey, $decryptedCardNumber);
                                        $encryptedCVC = cryptor::encrypt($encryptionKey, $decryptedCardCvc);

                                        // update the card
                                        $cardGateway->update([
                                            'card_number' => $encryptedToken,
                                            'cvc' => $encryptedCVC,
                                            'timestamp' => $timestamp
                                        ], array('id' => $card['id']));
                                    }
                                }

                                // send info that it went alright
                                return $response->withJson([
                                    'status' => 'success',
                                    'message' => 'Password was set correctly'
                                ]);
                            } else {
                                // err code 2 is wrong password
                                return $response->withStatus(500)->withJson([
                                   'status' => 'error',
                                   'error_code' => 2,
                                   'message' => 'Password is not right.',
                                ]);
                            }
                        }else {
                            // user does not exists
                            return $response->withStatus(500)->withJson([
                                'status' => 'error',
                                'message' => 'User does not exists.',
                            ]);
                        }
                        // compare
                    }else {
                        // return that required parameter are not present
                        return $response->withStatus(500)->withJson([
                            'status' => 'error',
                            'message' => 'User does not exists.',
                        ]);
                    }
                }
            }
        }
    ],
    '/change-email' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            $body = $request->getParsedBody();
            if (isset($body)) {
                $result = checkJwt($body['jwt']);
                if ($result != false) {
                    $container = \Directus\Application\Application::getInstance()->getContainer();
                    $dbConnection = $container->get('database');

                    if (isset($body['new_email']) && isset($body['password'])) {
                        // verify the password
                        $userGateway = new TableGateway('directus_users', $dbConnection);
                        $userResult = $userGateway->select(array('id' => $result['user']));

                        if ($userResult->count() > 0) {
                            // user does exists
                            $userResult = $userResult->toArray()[0];

                            // verify the password
                            if (password_verify($body['password'], $userResult['password'])) {
                                // the user's password is verified
                                $eventLogGateway = new TableGateway('event_log', $dbConnection);

                                $jsonPayload = [
                                    'code' => rand(111111, 999999),
                                    'new_email' => $body['new_email'],
                                ];

                                mail($userResult['email'], 'E-mail change | AtlantaMealsPrep', "Hi there!, you've requeste an email change, here is your code: " . $jsonPayload['code'] . '.');

                                $eventLogGateway->insert([
                                    'user_id' => $result['user'],
                                    'name' => 'change_email_request',
                                    'content' => json_encode($jsonPayload)
                                ]);

                                // return successful response
                                return $response->withJson([
                                    'status' => 'success',
                                    'message' => 'The request was succesfully sent. Check yo email.'
                                ]);
                            }else {
                                // return that password is wrong
                                return $response->withJson([
                                    'status' => 'error',
                                    'message' => 'Wrong password was provided.'
                                ]);
                            }

                        }else {
                            // user does not exists
                            return $response->withStatus(500)->withJson([
                                'status' => 'error',
                                'message' => 'User does not exists.'
                            ]);
                        }
                    }
                }
            }
        }
    ],
    '/finish-email-change' => [
        'method' => 'POST',
        'handler' => function (Request $request, Response $response) {
            $body = $request->getParsedBody();
            if (isset($body)) {
                $result = checkJwt($body['jwt']);
                if ($result != false) {
                    $container = \Directus\Application\Application::getInstance()->getContainer();
                    $dbConnection = $container->get('database');

                    if (isset($body['code'])) {
                        // verify the password
                        $userGateway = new TableGateway('directus_users', $dbConnection);
                        $userResult = $userGateway->select(array('id' => $result['user']));

                        if ($userResult->count() > 0) {
                            $eventLogGateway = new TableGateway('event_log', $dbConnection);
                            $eventLogResult = $eventLogGateway->select(array('user_id' => $result['user'], 'name' => 'change_email_request', 'active' => 1));
                            if ($eventLogResult->count() > 0) {
                                $eventLogResult = $eventLogResult->toArray()[0];
                                $jsonPayload = json_decode($eventLogResult['content']);

                                if ($body['code'] == $jsonPayload->code) {
                                    // change the email
                                    $userGateway->update(array('email' => $jsonPayload->new_email), array('id' => $result['user']));
                                    $eventLogGateway->update(array('active' => 0), array('id' => $eventLogResult['id']));
                                    return $response->withJson([
                                        'status' => 'success',
                                        'message' => 'E-mail updated.'
                                    ]);
                                }else {
                                    // return error that the code is not valid
                                    return $response->withJson([
                                       'status' => 'error',
                                       'message' => 'The code is wrong.',
                                    ]);
                                }
                            }else {
                                // return error
                                return $response->withStatus(500)->withJson(['status' => 'error']);
                            }
                        }else {
                            // user does not exists
                            return $response->withStatus(500)->withJson([
                                'status' => 'error',
                                'message' => 'User does not exists.'
                            ]);
                        }
                    }
                }
            }
        }
    ],
];
