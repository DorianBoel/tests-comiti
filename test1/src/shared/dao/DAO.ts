import { EntityDTO } from "../dto/EntityDTO";
import { Entity } from "../entities/Entity";
import { Mapper } from "../mappers/Mapper";
import { ORM } from "../orm/ORM";

/**
 * Class used to perform CRUD related operations on
 * instances of a given entity and relaying data to and from
 * the database.
 *
 * @template ENT extends Entity The type of the mapped entity
 * @template DTO extends EntityDTO The type of the DTO corresponding to the entity
 */
export class DAO<ENT extends Entity, DTO extends EntityDTO> {

    /**
     * Creates a new instance of DAO with the given mapper
     * implementation for the given entity and DTO.
     * Also asynchronously loads every registered instance
     * of the entity class from the database for easier access.
     *
     * @template E extends Entity The type of the mapped entity
     * @template D extends EntityDTO The type of the DTO corresponding to the entity
     * @param {Mapper<E, D>} mapper A mapper implementation for the entity and the DTO
     * @returns {Promise<DAO<E, D>>} A promise holding a new DAO instance
     */
    public static async loader<E extends Entity, D extends EntityDTO>
        (mapper: Mapper<E, D>): Promise<DAO<E, D>>
    {
        let dao: DAO<E, D> = new DAO(mapper);
        await dao.load();
        return dao;
    }

    /**
     * The orm used to exchange data with the database.
     */
    private orm: ORM;

    /**
     * A list containing every currently registered
     * entity instance.
     */
    private entities: ENT[] = [];

    /**
     * Creates an instance of DAO.
     *
     * @param {Mapper<ENT, DTO>} _mapper The mapper used to convert between entity and DTO
     */
    private constructor(private _mapper: Mapper<ENT, DTO>) {
        this.orm = ORM.getInstance();
    }

    /**
     * Loads every known instance of the mapped entity
     * registered in the database into this DAO instance
     * for easier access.
     */
    private async load() {
        let dtos: DTO[] = await this.orm.selectAll() as DTO[];
        this.entities = this.mapper.toEntityArray(dtos);
    }

    /**
     * Registers a given entity instance by inserting it
     * in the database and saving it in the regitered entity
     * array.
     *
     * @param {ENT} entity The new entity to save
     * @returns {Promise<DTO>} A promise holding the DTO
     * corresponding to the newly saved entity
     */
    async save(entity: ENT): Promise<DTO> {
        let dto: DTO = this._mapper.toDTO(entity);
        await this.orm.insert(dto)
            .then(() => this.entities.push(entity))
            .catch(err => { throw err });
        return dto;
    }

    /**
     * Gets the array containing every registered instance of
     * the mapped entity.
     *
     * @returns {ReadonlyArray<ENT>} An array of every registered entity instance
     */
    getEntities(): ReadonlyArray<ENT> {
        return this.entities;
    }

    /**
     * Getter for {@link _mapper}
     *
     * @returns {Mapper<ENT, DTO>}
     */
    get mapper(): Mapper<ENT, DTO> {
        return this._mapper;
    }

}
