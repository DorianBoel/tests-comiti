import { EntityDTO } from "../dto/EntityDTO";
import { Entity } from "../entities/Entity";
import { Mapper } from "../mappers/Mapper";
import { ORM } from "../ORM";

export class DAO<ENT extends Entity, DTO extends EntityDTO> {

    public static async loader<E extends Entity, D extends EntityDTO>
        (mapper: Mapper<E, D>): Promise<DAO<E, D>>
    {
        let dao: DAO<E, D> = new DAO(mapper);
        await dao.load();
        return dao;
    }

    private orm: ORM;

    private entities: ENT[] = [];

    private constructor(private mapper: Mapper<ENT, DTO>) {
        this.orm = ORM.getInstance();
    }

    private add(entity: ENT): void {
        this.entities.push(entity);
    }

    private async load() {
        let dtos: DTO[] = await this.orm.selectAll() as DTO[];
        this.entities = this.mapper.toEntityArray(dtos);
    }

    async save(entity: ENT): Promise<void> {
        let dto: DTO = this.mapper.toDTO(entity);
        return await this.orm.insert(dto)
            .then(() => this.add(entity))
            .catch(err => { throw err });
    }

    getEntities(): ReadonlyArray<ENT> {
        return this.entities;
    };

    getMapper(): Mapper<ENT, DTO> {
        return this.mapper;
    }

}
