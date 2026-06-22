(function () {
    const originalFetch = window.fetch.bind(window);

    window.fetch = async (url, options = {}) => {
        const token = localStorage.getItem('jwt');

        return originalFetch(url, {
            ...options,
            headers: {
                ...options.headers,
                ...(token ? {Authorization: `Bearer ${token}`} : {}),
            },
        });
    };
})();