### Install

`npm install --save is-json-type`

### Notes

Right now, this library considers `undefined` a JSON primitive type (even though it is not).

Note the following gotcha',

```
JSON.stringify({ x : undefined }); //'{}'
JSON.stringify({ x : null });      //'{ "x" : null }'
```

### Usage

```
declare const mixed : any;

if (isJsonPrimitiveType(mixed)) {
    //mixed is string|number|boolean|null|undefined
}
if (isJsonObjectType(mixed)) {
    //mixed is { [key : string] : JsonType; }
}
if (isJsonArrayType(mixed)) {
    //mixed is JsonType[]
}
if (isJsonType(mixed)) {
    //mixed is JsonType
}
/*
    A JsonType is recursively defined.
    A JsonType is one of the following,

    + A JSON primitive
    + An object with JsonType values
    + An array of JsonType.
*/
```
