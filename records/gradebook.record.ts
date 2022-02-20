import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2";

type GradebookRecordResults = [GradebookRecord[], FieldPacket[]];

export class GradebookRecord {
    //We assume that grade book is only readable for Santa
    id: string;
    content: string;
    symbol: "+" | "-";

    constructor(obj: GradebookRecord) {
        if(!obj.content || obj.content.length < 1 || obj.content.length > 200) {
            throw new ValidationError('Content should have more than 1 character and less than 200');
        }
        if(!obj.symbol || (obj.symbol !== "+" && obj.symbol !== "-")){
            throw new ValidationError('Symbol should have value "+" (positive mark) or "-" (negative mark)');
        }
        this.id = obj.id;
        this.content = obj.content;
        this.symbol = obj.symbol;
    }

    static async listAll(): Promise<GradebookRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `gradebook` ORDER BY `symbol`") as GradebookRecordResults;
        console.log(results);
        return results.map(obj => new GradebookRecord(obj));

    }

    static async getOne(id: string): Promise<GradebookRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `children` WHERE `id` = :id ", {
            id,
        }) as GradebookRecordResults;
        return results.length === 0 ? null : new GradebookRecord(results[0]);
    }
}