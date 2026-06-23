(function () {
    const originalFetch = window.fetch.bind(window);

    function isTokenExpired(token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch {
            return true; // malformed token, treat as expired
        }
    }

    let sessionExpired = false;

    window.fetch = async (url, options = {}) => {
        const token = localStorage.getItem('jwt');

        const isInternalApi = url.startsWith(<?=json_encode(getenv('api_base_url'))?>);

        const response = await originalFetch(url, {
            ...options,
            headers: {
                ...options.headers,
                ...(token && isInternalApi
                    ? {Authorization: `Bearer ${token}`}
                    : {}),
            },
        });

        // If a token is set and you get a 401 (invalid credentials) assume session has expired
        if (token && response.status === 401 && !sessionExpired) {
            sessionExpired = true;
            localStorage.removeItem('jwt');
            alert('Je sessie is verlopen. Je wordt doorgestuurd naar de loginpagina.');
            window.location.href = '/login';
        }

        return response;
    };
})();