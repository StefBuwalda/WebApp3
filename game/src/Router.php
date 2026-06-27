<?php

class Router
{
    private array $routes = [];
    private array $staticDirs = [];

    public function add(string $path, string $file): void
    {
        $this->routes[$path] = $file;
    }

    public function serveDir(string $urlPrefix, string $dir, string $contentType): void
    {
        $this->staticDirs[] = [
            'prefix' => $urlPrefix,
            'dir' => $dir,
            'type' => $contentType,
        ];
    }

    public function dispatch(string $notFound): void
    {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

        // Exact route match
        if (isset($this->routes[$path])) {
            include $this->routes[$path];
            return;
        }

        // Static directory match
        foreach ($this->staticDirs as $entry) {
            if (str_starts_with($path, $entry['prefix'])) {
                $relative = substr($path, strlen($entry['prefix']));
                $file = realpath($entry['dir'] . '/' . $relative);

                if ($file !== false && str_starts_with($file, realpath($entry['dir']))) {
                    header('Content-Type: ' . $entry['type']);
                    include $file;
                    return;
                }
            }
        }

        // Fallback
        http_response_code(404);
        include $notFound;
    }
}