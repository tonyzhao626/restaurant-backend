<?php

return [
    'database' => [
        'type' => 'mysql',
        'host' => 'mysql41.hostingsolutions.cz:3306',
        'port' => 8889,
        'name' => 'projects_atlanta',
        'username' => 'sudo',
        'password' => 'Borec13111522001',
        'engine' => 'InnoDB',
        'charset' => 'utf8mb4',
        // Remove 'host' above when using sockets
        'socket' => '',
    ],

    'cookie' => [
        'same_site' => 'Strict',
        'secure' => false
    ],

    'cors' => [
        'enabled' => true,          // Enable or disable all CORS headers
        'origin' => ['*'],          // Access-Control-Allow-Origin
        'methods' => [              // Access-Control-Allow-Methods
            'GET',
            'POST',
            'PUT',
            'PATCH',
            'DELETE',
            'HEAD',
        ],
        'headers' => [],            // Access-Control-Allow-Headers
        'exposed_headers' => [],    // Access-Control-Expose-Headers
        'max_age' => null,          // Access-Control-Allow-Max-Age
        'credentials' => false,     // Access-Control-Allow-Credentials
    ],

    'rate_limit' => [
        'enabled' => false,
        'limit' => 100,
        'interval' => 60,
        'adapter' => 'redis',
        'host' => '127.0.0.1',
        'port' => 6379,
        'timeout' => 10,
    ],

    'storage' => [
        'adapter' => 'local',
        'root' => 'public/uploads/atlanta-meal-prep/originals',
        'root_url' => '/uploads/atlanta-meal-prep/originals',
        'thumb_root' => 'public/uploads/atlanta-meal-prep/generated',
        // 'key' => '',
        // 'secret' => '',
        // 'region' => '',
        // 'version' => '',
        // 'bucket' => '',
        // 'options' => '',
        // 'endpoint' => '',
        // 'proxy_downloads' => '',
    ],

    'mail' => [
        'default' => [
            'transport' => 'sendmail',
            // 'sendmail' => '',
            // 'host' => '',
            // 'port' => '',
            // 'username' => '',
            // 'password' => '',
            // 'encryption' => '',
            'from' => 'admin@example.com'
        ],
    ],

    'cache' => [
        'enabled' => false,
        'response_ttl' => 3600,
        'pool' => [
            // 'adapter' => '',
            // 'path' => '',
            // 'host' => '',
            // 'port' => '',
        ],
    ],

    'auth' => [
        'secret_key' => 'CoFl7ARbuLlBcaq40FB0SR9qYlhh8TLq',
        'public_key' => '89fcb175-aaa8-46e1-839e-b1acf9512c4c',
        'ttl' => 20,
        'social_providers' => [
            // 'okta' => '',
            // 'github' => '',
            // 'facebook' => '',
            // 'google' => '',
            // 'twitter' => '',
        ],
    ],

    'hooks' => [
        'actions' => [],
        'filters' => [],
    ],

    'tableBlacklist' => [],

    'env' => 'production',

    'logger' => [
        'path' => '/Applications/XAMPP/xamppfiles/htdocs/atlantameals/backend/src/core/Directus/Util/Installation/../../../../../logs',
    ],
];
