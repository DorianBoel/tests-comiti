import { v4 as uuid } from "uuid";

/**
 * Abstract class reprensenting an generic entity
 * within the application domain.
 */
export abstract class Entity {

    /**
     * An unique id used to identify this instance
     * once registered.
     */
    protected _id: string;

    /**
     * Creates an new entity instance,
     * attributing an unique id.
     *
     * @constructor
     */
    constructor() {
        this._id = uuid();
    }

    /**
     * Getter for {@link _id id}.
     */
    get id(): string {
        return this._id;
    }

    /**
     * Setter for {@link _id id}.
     */
    set id(id: string) {
        this._id = id;
    }

}
