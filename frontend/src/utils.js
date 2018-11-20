export function isValidCookie() {
    try {
        let cookie = JSON.parse(localStorage.cookie);
    
        if  (cookie.expires > Date.now()) {
            return true;
        }

        delete localStorage.cookie;
        return false;
    } catch (e) {
        delete localStorage.cookie;
        return false;
    }
}

export function deleteCookie() {
    delete localStorage.cookie;
}

export function getASBPassword() {
    try {
        return JSON.parse(localStorage.cookie).password;
    } catch (e) {
        return '';
    }
}

export function createCookie(password) {
    localStorage.cookie = JSON.stringify({
        password,
        expires: Date.now() + (15 * 60 * 1000)
    });
}