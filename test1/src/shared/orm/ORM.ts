import * as fs from "fs";
import { EntityDTO } from "../dto/EntityDTO";

/**
 * Singleton class allowing direct access to
 * the json data file by reading its contents
 * and writing new data in the form of
 * serializable DTOs.
 */
export class ORM {

    /**
     * Path to the main json data file/file directory.
     */
    private static dataFilePath: string = "data/data.json";

    /**
     * The singleton instance of this class.
     */
    private static singletonInstance: ORM;

    /**
     * Gets this class's singleton instance.
     *
     * @returns {ORM} The singleton instance
     */
    public static getInstance(): ORM {
        if (!this.singletonInstance) {
            this.singletonInstance = new ORM();
        }
        return this.singletonInstance;
    }

    /**
     * Reads the contents of the json data file and
     * returns it as a string.
     *
     * @returns {Promise<string>} A promise holding the contents of the data file
     */
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

    /**
     * Rewrites the contents of the data file by
     * replacing it with the given data.
     *
     * @param {string} data The data to add to the rewritten file
     * @returns {Promise<void>} The completion of this function with no return value
     */
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

    /**
     * Wrapper for the JSON.parse function,
     * converting a json string into
     * an array of DTOs representing entities.
     *
     * @param {string} jsonData The data to deserialize
     * @returns {EntityDTO[]} The resulting array of DTOs
     */
    private deserialize(jsonData: string): EntityDTO[] {
        return JSON.parse(jsonData);
    }

    /**
     * Wrapper for the JSON.stringify function,
     * converting an array of DTOs into a formatted
     * string of json data.
     *
     * @param {EntityDTO[]} object The array of DTO to serialize
     * @returns {string} The resulting formatted json string
     */
    private serialize(object: EntityDTO[]): string {
        return JSON.stringify(object, null, "    ");
    }

    /**
     * Inserts a new entity by appending a
     * serialized DTO object to the json data list.
     *
     * @param {EntityDTO} dto A DTO representing the new entity to insert
     * @returns {Promise<void>} The completion of this function with no return value
     */
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

    /**
     * Retrieves an array of deserialized entity DTOs
     * corresponding to all objects in the json data file.
     *
     * @returns {Promise<EntityDTO[]>} A promise holding the array of all registered entity DTOs
     */
    async selectAll(): Promise<EntityDTO[]> {
        return await this.read()
            .then(this.deserialize)
            .catch(err => { throw err });
    }

}
