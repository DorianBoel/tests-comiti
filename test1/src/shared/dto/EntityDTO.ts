/**
 * Interface to be extended by data transfer objects
 * which can be converted to and from entity instances.
 */
export interface EntityDTO {
    /**
     * The unique id used to identify this object once stored
     * as a json object.
     */
    id?: string;
}
