/**
 * Defines a de/serializer for type `T` from record `R`
 * `R` is the interface of the API response for type `T`
 * `Serializer.fromJSON` deserializes JSON of interface `R` to result type `T`
 * `Serializer.toJSON` serializes an instance of type `T` to JSON of interface `R`
 */
export interface Serializer<T, R = Record<string, unknown>> {
  fromJSON(json: R): T
  toJSON(obj: T): R
}
