if (!window.activityRequests) {
    window.activityRequests = {
        map: {}
    }
}


export function isValidCookie() {
    return !!window.activityRequests.asbPassword;
}

export function deleteCookie() {
    delete window.activityRequests.asbPassword;
}

export function getASBPassword() {
    return window.activityRequests.asbPassword || '';
}

export function createCookie(password) {
    window.activityRequests.asbPassword = password;
}



export function cacheForm(id, data) {
    window.activityRequests.formCache[id] = data;
}

export function getCachedForm(id) {
    return window.activityRequests.formCache[id];
}

export function deleteCachedForm(id) {
    delete window.activityRequests.formCache[id];
}




export function put(key, value) {
    window.activityRequests.map[key] = value;
}

export function get(key) {
    return window.activityRequests.map[key];
}

export function remove(key) {
    delete window.activityRequests.map[key];
}
