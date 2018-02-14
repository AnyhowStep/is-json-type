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

//`undefined` is not technically a Json primitive.
//It gets removed during serialization
//TODO Would it be better to explicitly disallow `undefined` as a primitive type to be more rigorous?
export type JsonPrimitiveType = string|number|boolean|null|undefined;
//Objects can have primitives, objects, or arrays as elements
export type JsonObjectType = {
    [key : string] : JsonType;
};
//Arrays can have primitives, objects, or arrays as elements
export interface JsonArrayType extends Array<JsonType> {
}
export type JsonType = JsonPrimitiveType|JsonObjectType|JsonArrayType;

export function isJsonPrimitiveType (mixed : any) : mixed is JsonPrimitiveType {
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
export function isJsonObjectType (mixed : any) : mixed is JsonObjectType {
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
    //https://github.com/douglascrockford/JSON-js/blob/master/json2.js#L326
    //JSON serialization only cares about keys if the object has it as its own property
    for (let k in mixed) {
        if (mixed.hasOwnProperty(k)) {
            const v = mixed[k];
            if (!isJsonType(v)) {
                //This value isn't one of the valid JSON types
                return false;
            }
        }
    }
    return true;
}
export function isJsonArrayType (mixed : any) : mixed is JsonArrayType {
    if (!(mixed instanceof Array)) {
        return false;
    }
    for (let v of mixed) {
        if (!isJsonType(v)) {
            return false;
        }
    }
    return true;
}
export function isJsonType (mixed : any) : mixed is JsonType {
    return (
        isJsonPrimitiveType(mixed) ||
        isJsonObjectType(mixed) ||
        isJsonArrayType(mixed)
    );
}
