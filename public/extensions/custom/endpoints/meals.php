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
            $tableGateway = new TableGateway('meal_plan', $dbConnection);
            $mealsJunctionGateway = new TableGateway('meal_plan_products', $dbConnection);
            $mealProducts = new TableGateway('meal_products', $dbConnection);
            $mealImages = new TableGateway(SchemaManager::COLLECTION_FILES, $dbConnection);

            // shorthand for select with where query
            $mealPlansIDs = $tableGateway->select('CURRENT_DATE >= start_date AND CURRENT_DATE <= end_date')->toArray();
            $meals = [];

            // check if it should return on the one meal
            $returnOnlyOneMealItem = false;

            if ($body = $request->getParsedBody()) {
                if (isset($body['weeklyMenu'])) {
                    $returnOnlyOneMealItem = $body['weeklyMenu'];
                }
            }

            // get only the one meal plan
            if ($returnOnlyOneMealItem == true) {
                $mealName = '';
                foreach ($mealPlansIDs as $mealPlan) {
                    if ($mealName == '') {
                        $mealName = $mealPlan['meal_plan_name'];
                    }else {
                        $mealName .= ', ' . $mealPlan['meal_plan_name'];
                    }
                }

                return $response->withJson([
                    'status' => 'success',
                    'result' => $mealName
                ]);
            }

            // loop through the meal plans
            foreach ($mealPlansIDs as $mealPlan) {
                $mealsObjects = $mealsJunctionGateway->select('meal_plan_id = ' . $mealPlan['id']);
                if($mealsObjects) {
                    $mealsObjects = $mealsObjects->toArray();

                    foreach ($mealsObjects as $ml) {
                        $food = $mealProducts->select('id = ' . $ml['meal_products_id'] . ' AND category=0');
                        if ($food) {
                            $food = $food->toArray();
                            // set the image into URL
                            if ($food[0]['image'] != 0 && $food[0]['image'] != '') {
                                $image = $mealImages->select('id = ' . $food[0]['image'])->toArray();
                                $imageUrl = '/atlantameals/backend/public/uploads/atlanta-meal-prep/originals/' . $image[0]['filename_disk'];
                                $food[0]['image'] = $imageUrl;
                            }
                            if ($food[0] !== null) {
                                array_push($meals, $food[0]);
                            }
                        }
                    }

                }
            }
            return $response->withJson($meals);
        }
    ],
    '/get-meal-plans' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) {
            // get all of the IDs between
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');
            $tableGateway = new TableGateway('meal_plan', $dbConnection);
            $mealsJunctionGateway = new TableGateway('meal_plan_products', $dbConnection);
            $mealProducts = new TableGateway('meal_products', $dbConnection);
            $mealImages = new TableGateway(SchemaManager::COLLECTION_FILES, $dbConnection);

            // shorthand for select with where query
            $mealPlansIDs = $tableGateway->select('CURRENT_DATE >= start_date AND CURRENT_DATE <= end_date')->toArray();
            $meals = [];

            // check if it should return on the one meal
            $returnOnlyOneMealItem = false;

            if ($body = $request->getParsedBody()) {
                if (isset($body['weeklyMenu'])) {
                    $returnOnlyOneMealItem = $body['weeklyMenu'];
                }
            }

            // get only the one meal plan
            if (true == true) {
                $mealName = '';
                foreach ($mealPlansIDs as $mealPlan) {
                    if ($mealName == '') {
                        $mealName = $mealPlan['meal_plan_name'];
                    }else {
                        $mealName .= ', ' . $mealPlan['meal_plan_name'];
                    }
                }

                return $response->withJson([
                    'status' => 'success',
                    'result' => $mealName
                ]);
            }

        }
    ],
    '/breakfast' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) {
            // get all of the IDs between
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');
            $tableGateway = new TableGateway('meal_plan', $dbConnection);
            $mealsJunctionGateway = new TableGateway('meal_plan_products', $dbConnection);
            $mealProducts = new TableGateway('meal_products', $dbConnection);
            $mealImages = new TableGateway(SchemaManager::COLLECTION_FILES, $dbConnection);

            // shorthand for select with where query
            $mealPlansIDs = $tableGateway->select('CURRENT_DATE >= start_date AND CURRENT_DATE <= end_date')->toArray();
            $meals = [];

            // loop through the meal plans
            foreach ($mealPlansIDs as $mealPlan) {
                $mealsObjects = $mealsJunctionGateway->select('meal_plan_id = ' . $mealPlan['id']);
                if($mealsObjects) {
                    $mealsObjects = $mealsObjects->toArray();
                    foreach ($mealsObjects as $ml) {
                        $food = $mealProducts->select('id = ' . $ml['meal_products_id'] . ' AND category=1');
                        if ($food) {
                            $food = $food->toArray();
                            // set the image into URL
                            if ($food[0]['image'] != 0 && $food[0]['image'] != '') {
                                $image = $mealImages->select('id = ' . $food[0]['image'])->toArray();
                                $imageUrl = '/atlantameals/backend/public/uploads/atlanta-meal-prep/originals/' . $image[0]['filename_disk'];
                                $food[0]['image'] = $imageUrl;
                            }
                            if ($food[0] !== null) {
                                array_push($meals, $food[0]);
                            }
                        }
                    }
                }
            }
            return $response->withJson($meals);
        }
    ],
    '/snacks' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) {
            // get all of the IDs between
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');
            $tableGateway = new TableGateway('meal_plan', $dbConnection);
            $mealsJunctionGateway = new TableGateway('meal_plan_products', $dbConnection);
            $mealProducts = new TableGateway('meal_products', $dbConnection);
            $mealImages = new TableGateway(SchemaManager::COLLECTION_FILES, $dbConnection);

            // shorthand for select with where query
            $mealPlansIDs = $tableGateway->select('CURRENT_DATE >= start_date AND CURRENT_DATE <= end_date')->toArray();
            $meals = [];

            // loop through the meal plans
            foreach ($mealPlansIDs as $mealPlan) {
                $mealsObjects = $mealsJunctionGateway->select('meal_plan_id = ' . $mealPlan['id']);
                if($mealsObjects) {
                    $mealsObjects = $mealsObjects->toArray();
                    foreach ($mealsObjects as $ml) {
                        $food = $mealProducts->select('id = ' . $ml['meal_products_id'] . ' AND category=3');
                        if ($food) {
                            $food = $food->toArray();
                            // set the image into URL
                            if ($food[0]['image'] != 0 && $food[0]['image'] != '') {
                                $image = $mealImages->select('id = ' . $food[0]['image'])->toArray();
                                $imageUrl = '/atlantameals/backend/public/uploads/atlanta-meal-prep/originals/' . $image[0]['filename_disk'];
                                $food[0]['image'] = $imageUrl;
                            }
                            if ($food[0] !== null) {
                                array_push($meals, $food[0]);
                            }
                        }
                    }
                }
            }
            return $response->withJson($meals);
        }
    ],
    '/vegan-bowl' => [
        'method' => 'GET',
        'handler' => function (Request $request, Response $response) {
            // get all of the IDs between
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');
            $tableGateway = new TableGateway('meal_plan', $dbConnection);
            $mealsJunctionGateway = new TableGateway('meal_plan_products', $dbConnection);
            $mealProducts = new TableGateway('meal_products', $dbConnection);
            $mealImages = new TableGateway(SchemaManager::COLLECTION_FILES, $dbConnection);

            // shorthand for select with where query
            $mealPlansIDs = $tableGateway->select('CURRENT_DATE >= start_date AND CURRENT_DATE <= end_date')->toArray();
            $meals = [];

            // loop through the meal plans
            foreach ($mealPlansIDs as $mealPlan) {
                $mealsObjects = $mealsJunctionGateway->select('meal_plan_id = ' . $mealPlan['id']);
                if($mealsObjects) {
                    $mealsObjects = $mealsObjects->toArray();
                    foreach ($mealsObjects as $ml) {
                        $food = $mealProducts->select('id = ' . $ml['meal_products_id'] . ' AND category=2');
                        if ($food) {
                            $food = $food->toArray();
                            // set the image into URL
                            if ($food[0]['image'] != 0 && $food[0]['image'] != '') {
                                $image = $mealImages->select('id = ' . $food[0]['image'])->toArray();
                                $imageUrl = '/atlantameals/backend/public/uploads/atlanta-meal-prep/originals/' . $image[0]['filename_disk'];
                                $food[0]['image'] = $imageUrl;
                            }
                            if ($food[0] !== null) {
                                array_push($meals, $food[0]);
                            }
                        }
                    }
                }
            }
            return $response->withJson($meals);
        }
    ]
];
