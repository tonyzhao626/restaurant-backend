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
            // get all of the IDs
            $container = \Directus\Application\Application::getInstance()->getContainer();
            // get connection
            $dbConnection = $container->get('database');
            $tableGateway = new TableGateway('meal_plan', $dbConnection);
            $mealsJunctionGateway = new TableGateway('meal_plan_side_dishes', $dbConnection);
            $mealProducts = new TableGateway('side_dishes', $dbConnection);
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
                        $food = $mealProducts->select('id = ' . $ml['side_dishes_id']);
                        if ($food) {
                            $food = $food->toArray();
                            // set the image into URL
                            if ($food[0]['image'] != 0 && $food[0]['image'] != '') {
                                $image = $mealImages->select('id = ' . $food[0]['image'])->toArray();
                                $imageUrl = '/atlantameals/backend/public/uploads/atlanta-meal-prep/originals/' . $image[0]['filename_disk'];
                                $food[0]['image'] = $imageUrl;
                            }
                            array_push($meals, $food[0]);
                        }
                    }
                }
            }
            return $response->withJson($meals);
        }
    ],
];
