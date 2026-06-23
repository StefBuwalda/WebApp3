<?php

require_once __DIR__ . '/../src/Router.php';

// 1. Define defaults
$defaults = [
    'API_BASE_URL' => 'http://127.0.0.1:8000',
];

// 2. Load .env
$env = parse_ini_file(__DIR__ . '/../.env');

// 3. Merge: env overrides defaults
$config = $defaults;

if ($env !== false) {
    $config = array_merge($config, $env);
}

// 4. Apply to environment (only if not already set)
foreach ($config as $key => $value) {
    putenv("$key=$value");
}

$router = new Router();

$router->add('/', __DIR__ . '/../src/pages/game.php');
$router->add('/login', __DIR__ . '/../src/pages/login.php');
$router->add('/register', __DIR__ . '/../src/pages/register.php');
$router->add('/settings', __DIR__ . '/../src/pages/preferences.php');

$router->serveDir('/js', __DIR__ . '/../src/js', 'application/javascript');

$router->dispatch(__DIR__ . '/../src/pages/404.php');
?>
