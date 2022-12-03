import { Entity } from "../../shared/entities/Entity";

export class Contact extends Entity {

    constructor(private _firstName: string, private _lastName: string,
        private _phoneNumber: string, private _dateOfBirth?: Date)
    {
        super();
    }

    get firstName(): string {
        return this._firstName;
    }

    get lastName(): string {
        return this._lastName;
    }

    get phoneNumber(): string {
        return this._phoneNumber;
    }

    get dateOfBirth(): Date | undefined {
        return this._dateOfBirth;
    }

    set firstName(firstName: string) {
        this._firstName = firstName;
    }

    set lastName(lastName: string) {
        this._lastName = lastName;
    }

    set phoneNumber(phoneNumber: string) {
        this._phoneNumber = phoneNumber;
    }

    set dateOfBirth(dateOfBirth: Date | undefined) {
        this._dateOfBirth = dateOfBirth;
    }

}
