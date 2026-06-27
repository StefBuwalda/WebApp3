class Auth {
    constructor(storageKey = 'jwt') {
        this.storageKey = storageKey;
    }

    getToken() {
        return localStorage.getItem(this.storageKey);
    }

    isLoggedIn() {
        const token = this.getToken();
        if (!token) return false;

        try {
            const base64url = token.split('.')[1];
            const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));

            console.log(payload.exp * 1000);

            if (payload.exp * 1000 > Date.now()) {
                return true;
            }

            this.logout();
            return false;
        } catch {
            this.logout();
            return false;
        }
    }

    logout() {
        localStorage.removeItem(this.storageKey);
    }

    show(selector) {
        document.querySelectorAll(selector).forEach(el => el.style.display = 'block');
    }

    hide(selector) {
        document.querySelectorAll(selector).forEach(el => el.style.display = 'none');
    }

    applyVisibility() {
        if (this.isLoggedIn()) {
            this.show('[data-auth]');
            this.hide('[data-guest]');
        } else {
            this.hide('[data-auth]');
            this.show('[data-guest]');
        }
    }
}

export {Auth};
export default new Auth();