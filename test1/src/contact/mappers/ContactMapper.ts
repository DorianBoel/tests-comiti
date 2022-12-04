import { ContactDTO } from "../dto/ContactDTO";
import { Contact } from "../entities/Contact";
import { Mapper } from "../../shared/mappers/Mapper";

export class ContactMapper extends Mapper<Contact, ContactDTO> {

    toDTO(entity: Contact): ContactDTO {
        return {
            id: entity.id,
            firstName: entity.firstName,
            lastName: entity.lastName,
            phoneNumber: entity.phoneNumber,
            dateOfBirth: entity.dateOfBirth
        }
    }

    toDTOArray(entityArray: Contact[]): ContactDTO[] {
        return entityArray.map(this.toDTO);
    }

    toEntity(dto: ContactDTO): Contact {
        const date: Date | undefined = dto.dateOfBirth ?
            new Date(dto.dateOfBirth) : undefined;
        const entity = new Contact(
            dto.firstName,
            dto.lastName,
            dto.phoneNumber,
            date
        );
        if (dto.id) {
            entity.id = dto.id;
        }
        return entity;
    }

    toEntityArray(dtoArray: ContactDTO[]): Contact[] {
        return dtoArray.map(this.toEntity);
    }

}
