<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$pages = [
        '/'        => __DIR__ . '/../src/pages/game.php',
        '/login'   => __DIR__ . '/../src/pages/login.php',
];

$page = $pages[$path] ?? __DIR__ . '/../src/pages/game.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Example page</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/navbar.css">
    <link rel="stylesheet" href="/css/card.css">
    <link rel="stylesheet" href="/css/healthbar.css">
    <link rel="stylesheet" href="/css/home.css"
</head>

<?php
foreach (file(__DIR__ . '/../.env') as $line) {
    $line = trim($line);
    if ($line && !str_starts_with($line, '#')) {
        [$key, $value] = explode('=', $line, 2);
        $_ENV[trim($key)] = trim($value);
    }
}
?>

<body>
<?php
include $page;
?>
</body>
</html>
