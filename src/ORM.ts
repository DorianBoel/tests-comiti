import * as fs from "fs";
import { EntityDTO } from "./dto/EntityDTO";

export class ORM {

    private static dataFilePath: string = "data/data.json";

    private static singletonInstance: ORM;

    public static getInstance(): ORM {
        if (!this.singletonInstance) {
            this.singletonInstance = new ORM();
        }
        return this.singletonInstance;
    }

    private read(): Promise<string>  {
        return new Promise((resolve, reject) => {
            fs.readFile(ORM.dataFilePath, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data.toString());
            });
        })
    }

    private write(data: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(ORM.dataFilePath, data, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    private deserialize(jsonData: string): EntityDTO[] {
        return JSON.parse(jsonData);
    }

    private serialize(object: EntityDTO[]): string {
        return JSON.stringify(object, null, "    ");
    }

    async insert(dto: EntityDTO): Promise<void> {
        return await this.read()
            .then(this.deserialize)
            .then(entities => {
                entities.push(dto);
                return this.serialize(entities);
            })
            .then(this.write)
            .catch(err => { throw err });
    }

    async selectAll(): Promise<EntityDTO[]> {
        return await this.read()
            .then(this.deserialize)
            .catch(err => { throw err });
    }

}
