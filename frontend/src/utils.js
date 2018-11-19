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