import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";

type ChildRecordResults = [ChildRecord[], FieldPacket[]];

export class ChildRecord {
    public id: string;
    public name: string;
    public giftId?: null | string;
    public markId: string;

    constructor(obj: ChildRecord) {

        if(!obj.name || obj.name.length < 2 || obj.name.length > 26) {
            throw new ValidationError('Name should have more than 2 characters and less than 26');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.giftId = obj.giftId;
        this.markId = obj.markId;
    }

    static async listAll() {

        const [results] = await pool.execute("SELECT * FROM `children` ORDER BY `name` ASC") as ChildRecordResults;
        return results.map(obj => new ChildRecord(obj));

    }

    async insert() {
        if(!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `children`(`id`, `name`) VALUES(:id, :name) ", {
            id: this.id,
            name: this.name,
        })

    }

    static async getOne(id: string): Promise<ChildRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `children` WHERE `id` = :id ", {
            id,
        }) as ChildRecordResults;
        return results.length === 0 ? null : new ChildRecord(results[0]);
    }

    async update(): Promise<void>{
        await pool.execute("UPDATE `children` SET `name` = :name, `giftId` = :giftId WHERE `id` = :id ", {
            id: this.id,
            name: this.name,
            giftId: this.giftId,
        })
    }
}