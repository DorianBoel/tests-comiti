import { v4 as uuid } from "uuid";

export abstract class Entity {

    protected _id: string;

    constructor() {
        this._id = uuid();
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

}
