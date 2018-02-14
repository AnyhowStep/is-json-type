export declare type JsonPrimitiveType = string | number | boolean | null | undefined;
export declare type JsonObjectType = {
    [key: string]: JsonType;
};
export interface JsonArrayType extends Array<JsonType> {
}
export declare type JsonType = JsonPrimitiveType | JsonObjectType | JsonArrayType;
export declare function isJsonPrimitiveType(mixed: any): mixed is JsonPrimitiveType;
export declare function isJsonObjectType(mixed: any, seen?: any[]): mixed is JsonObjectType;
export declare function isJsonArrayType(mixed: any, seen?: any[]): mixed is JsonArrayType;
export declare function isJsonType(mixed: any, seen?: any[]): mixed is JsonType;
