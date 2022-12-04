import { EntityDTO } from "../dto/EntityDTO";
import { Entity } from "../entities/Entity";

/**
 * Abstract class containing methods used to
 * convert an entity instance to its DTO form and vice versa.
 * The mapping between the entity and the DTO is determined in
 * specific implementations of this class.
 *
 * @template E extends Entity The type of the mapped entity
 * @template D extends EntityDTO The type of the DTO corresponding to the entity
 */
export abstract class Mapper<E extends Entity, D extends EntityDTO> {

    /**
     * Converts an entity into its corresponding DTO object,
     * as specified by the mapper implementation.
     *
     * @param {E} entity The entity to be converted
     * @returns {D} The resulting DTO object
     */
    abstract toDTO(entity: E): D;

    /**
     * Converts each entity in a given array into its corresponding
     * DTO object, as specified by the mapper implementation.
     *
     * @param {E[]} entityArray The array of entities to be converted
     * @returns {D[]} The resulting array of DTO objects
     */
    abstract toDTOArray(entityArray: E[]): D[];

    /**
     * Converts a DTO into an instance of its corresponding entity
     * class, as specified by the mapper implementation.
     *
     * @param {D} dto The DTO to be converted
     * @returns {E} The resulting entity instance
     */
    abstract toEntity(dto: D): E;

    /**
     * Converts each DTO in a given array into an instance
     * of its corresponding entity class, as specified by
     * the mapper implementation.
     *
     * @param {D} dtoArray The array of DTOs to be converted
     * @returns {E} The resulting array of entity instances
     */
    abstract toEntityArray(dtoArray: D[]): E[];

}
