import { EntityDTO } from "./EntityDTO"

export interface PersonDTO extends EntityDTO {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    dateOfBirth?: Date
}
