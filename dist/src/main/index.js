"use strict";
//https://www.json.org/
/*
    JSON types, in brief,

    + string
    + number
    + object
    + array
    + boolean
    + null
*/
Object.defineProperty(exports, "__esModule", { value: true });
function isJsonPrimitiveType(mixed) {
    if (mixed === null || mixed === undefined) {
        return true;
    }
    if (typeof mixed == "number") {
        //https://github.com/douglascrockford/JSON-js/blob/master/json2.js#L257
        //> JSON numbers must be finite. Encode non-finite numbers as null.
        return isFinite(mixed);
    }
    switch (typeof mixed) {
        case "string":
        case "boolean": {
            return true;
        }
        default: {
            return false;
        }
    }
}
exports.isJsonPrimitiveType = isJsonPrimitiveType;
function isJsonObjectType(mixed, seen = []) {
    if (mixed === null || mixed === undefined) {
        return false;
    }
    if (!(mixed instanceof Object)) {
        return false;
    }
    if (mixed instanceof Array) {
        return false;
    }
    if (mixed instanceof Date) {
        return false;
    }
    if (seen.indexOf(mixed) >= 0) {
        //This array is part of a circular structure
        return false;
    }
    seen.push(mixed);
    //https://github.com/douglascrockford/JSON-js/blob/master/json2.js#L326
    //JSON serialization only cares about keys if the object has it as its own property
    for (let k in mixed) {
        if (mixed.hasOwnProperty(k)) {
            const v = mixed[k];
            if (!isJsonType(v, seen)) {
                //This value isn't one of the valid JSON types
                return false;
            }
        }
    }
    return true;
}
exports.isJsonObjectType = isJsonObjectType;
function isJsonArrayType(mixed, seen = []) {
    if (!(mixed instanceof Array)) {
        return false;
    }
    if (seen.indexOf(mixed) >= 0) {
        //This array is part of a circular structure
        return false;
    }
    seen.push(mixed);
    for (let v of mixed) {
        if (!isJsonType(v, seen)) {
            return false;
        }
    }
    return true;
}
exports.isJsonArrayType = isJsonArrayType;
function isJsonType(mixed, seen = []) {
    return (isJsonPrimitiveType(mixed) ||
        isJsonObjectType(mixed, seen) ||
        isJsonArrayType(mixed, seen));
}
exports.isJsonType = isJsonType;
//# sourceMappingURL=index.js.map