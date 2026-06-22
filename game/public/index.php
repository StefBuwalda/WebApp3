<?php

require_once __DIR__ . '/../src/Router.php';

// Load .env
$env = parse_ini_file(__DIR__ . '/../.env');
if ($env !== false) {
    foreach ($env as $key => $value) {
        putenv("$key=$value");
    }
}

$router = new Router();

$router->add('/', __DIR__ . '/../src/pages/game.php');
$router->add('/login', __DIR__ . '/../src/pages/login.php');
$router->add('/register', __DIR__ . '/../src/pages/register.php');

$router->serveDir('/js', __DIR__ . '/../src/js', 'application/javascript');

$router->dispatch(__DIR__ . '/../src/pages/404.php');
?>
