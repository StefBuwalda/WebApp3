<?php
header('Content-Type: application/javascript');
?>

export const config = {
    apiBaseUrl: <?=  json_encode(getenv("API_BASE_URL")) ?? "" ?>
};