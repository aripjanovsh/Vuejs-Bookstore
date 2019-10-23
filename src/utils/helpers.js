export function isEmpty(obj) {
    if (typeof (obj) == 'undefined' || obj === null) return true;
    if (typeof (obj) == 'number') return false;
    if (typeof (obj) == 'boolean') return false;
    if (isArray(obj) || isString(obj)) return obj.length === 0;
    for (let key in obj) if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
    return true;
}

export function isNotEmpty(obj) {
    return !isEmpty(obj)
}

export function isArray(array) {
    return Array.isArray(array);
}

export function isString(obj) {
    return !!(obj === '' || (obj && obj.charCodeAt && obj.substr));
}
