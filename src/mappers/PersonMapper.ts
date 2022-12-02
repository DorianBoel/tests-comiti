import { PersonDTO } from "../dto/PersonDTO";
import { Person } from "../entities/Person";
import { Mapper } from "./Mapper";
import { plainToInstance } from 'class-transformer';

export class PersonMapper extends Mapper<Person, PersonDTO> {

    toDTO(entity: Person): PersonDTO {
        return {
            id: entity.id,
            firstName: entity.firstName,
            lastName: entity.lastName,
            phoneNumber: entity.phoneNumber,
            dateOfBirth: entity.dateOfBirth
        }
    }

    toDTOArray(entityArray: Person[]): PersonDTO[] {
        return entityArray.map(this.toDTO);
    }

    toEntity(dto: PersonDTO): Person {
        return plainToInstance(Person, dto);
    }

    toEntityArray(dtoArray: PersonDTO[]): Person[] {
        return dtoArray.map(this.toEntity);
    }

}
