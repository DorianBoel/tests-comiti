import { EntityDTO } from "../dto/EntityDTO";
import { Entity } from "../entities/Entity";

export abstract class Mapper<E extends Entity, D extends EntityDTO> {

    abstract toDTO(entity: E): D;

    abstract toDTOArray(entityArray: E[]): D[];

    abstract toEntity(dto: D): E;

    abstract toEntityArray(dtoArray: D[]): E[];

}
