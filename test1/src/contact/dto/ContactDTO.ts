import { EntityDTO } from "../../shared/dto/EntityDTO";

export interface ContactDTO extends EntityDTO {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    dateOfBirth?: Date
}
