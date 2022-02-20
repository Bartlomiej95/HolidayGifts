import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";

type GiftRecordResults = [GiftRecord[], FieldPacket[]];

export class GiftRecord {

    id?: string;
    name: string;
    count: number;

    constructor(obj: GiftRecord) {
        if(!obj.name || obj.name.length < 3 || obj.name.length > 55 ) {
            throw new ValidationError('Gift should have more than 3 characters and less than 55 characters');
        }

        if(!obj.count || obj.count < 1 || obj.count > 999999) {
            throw new ValidationError('Amount should be in range 1 - 999999')
        }
        this.id = obj.id;
        this.name = obj.name;
        this.count = obj.count;
    }

    static async listAll(): Promise<GiftRecord[]> {

        const [results] = await pool.execute("SELECT * FROM `gifts` ") as GiftRecordResults;
        return results.map(obj => new GiftRecord(obj));
    }

    async insert(): Promise<string>{
        if(!this.id){
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `gifts`(`id`, `name`, `count`) VALUES(:id, :name, :count)", {
            id: this.id,
            name: this.name,
            count: this.count,
        });

        return this.id;
    }
    static async getOne(id: string): Promise<GiftRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `gifts` WHERE `id` = :id ", {
            id,
        }) as GiftRecordResults;
        return results.length === 0 ? null : new GiftRecord(results[0]);
    }

    async countGivenGifts(): Promise<number> {
        const [[{count}]] = await pool.execute("SELECT COUNT(*) AS `count` FROM `children` WHERE `giftId` = :id ", {
            id: this.id
        }) as GiftRecordResults;
        console.log("count", count);

        return count;
    }
}