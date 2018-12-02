if (!window.activityRequests) {
    window.activityRequests = {
        map: {}
    }
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
